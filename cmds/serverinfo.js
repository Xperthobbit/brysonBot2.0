/* serverinfo.js */
/* Remember to edit the JSON file before editing the code in here! */
const Discord = require('discord.js');
const fs = require('fs');
const Gamedig = require('gamedig');
/* const serverInfo = require('../serverinfo.json');  <-- Old method */

module.exports.run = async (Client, message, args) => {
  let msg = await message.channel.send('Checking my database...');
  let output = {};
  let digObj = {};

  /* New Method; Dynamically reads json for any updates */
  try {
    var serverList = JSON.parse(fs.readFileSync('./serverinfo.json', 'utf8'));
  } catch (err) {
    message.reply(`Error: ${err}`);
  }

  /* Fix this later. Really bad design */
  function regArray(array) {
    array.forEach((x) => {
      output = {
        ip: `${x.ip}`,
      };
      if (x.Port !== '') {
        output = {
          ip: `${x.ip}`,
          port: `${x.Port}`,
        };
      }
      if (x.Password) {
        output = {
          ip: `${x.ip}`,
          port: `${x.Port}`,
          password: `${x.Password}`,
        };
      }
    });
  }

  function gameName(obj) {
    obj.forEach((x) => {
      digObj = {
        type: `${args[0]}`,
        host: `${x.localip}`,
        port: `${x.Port}`,
      };
    });
  }

  switch (args[0]) {
    case 'minecraft':
    case 'mc':
      args[0] = 'minecraft';
      serverList.servers.forEach((x) => {
        if (x.minecraft) {
          regArray(x.minecraft);
          gameName(x.minecraft);
        }
      });
      break;
    case 'openfortress':
    case 'of':
      args[0] = 'openfortress';
      serverList.servers.forEach((x) => {
        if (x.openfortress) {
          regArray(x.openfortress);
          args[0] = 'tf2';
          gameName(x.openfortress);
          args[0] = 'OpenFortress';
        }
      });
      break;
    case 'l4d2':
      args[0] = 'l4d2';
      serverList.servers.forEach((x) => {
        if (x.l4d2) {
          regArray(x.l4d2);
          args[0] = 'left4dead2';
          gameName(x.l4d2);
        }
      });
      break;
    case 'garrysmod':
    case 'gmod':
      args[0] = 'garrysmod';
      serverList.servers.forEach((x) => {
        if (x.garrysmod) {
          regArray(x.garrysmod);
          gameName(x.garrysmod);
        }
      });
      break;
    case undefined:
      msg.delete();
      return message.reply(
        "please include a game server you wish to get the details for! Or type 'all' for all of them."
      );
      break;
    default:
      msg.delete();
      return message.reply("game server doesn't exist or invalid game!");
      break;
  }

  if (digObj) {
    var errorcode = '';
    await Gamedig.query({
      type: `${digObj.type}`,
      host: `${digObj.host}`,
      port: `${digObj.port}`,
    })
      .then((state) => {
        digObj = state;
      })
      .catch((error) => {
        errorcode = error;
      });
  }

  /* Also really bad programming but w/e. */
  var gameTitle = args[0].toUpperCase();
  var embed = new Discord.MessageEmbed()
    .setColor(0x5d2079)
    .setTitle(`${gameTitle} SERVER INFO:`)
    .setThumbnail('https://img.icons8.com/plasticine/2x/server.png')
    .setFooter(
      `brysondev.io`,
      'https://cdn.discordapp.com/emojis/522898117238980618.png?v=1'
    )
    .addFields(
      { name: 'IP:', value: `${output.ip}` },
      { name: 'Port:', value: `${output.port}` }
    );
  try {
    if (digObj.ping) {
      embed.addFields({
        name: 'Ping:',
        value: `${digObj.ping}`,
      });
    }
  } catch (error) {}
  try {
    if (errorcode) {
      embed.addFields(
        {
          name: 'Server Query:',
          value: 'FAILED!',
        },
        { name: 'Reason:', value: errorcode }
      );
    }
  } catch (error) {}
  try {
    if (digObj.map) {
      embed.addFields({
        name: 'Map:',
        value: `${digObj.map}`,
      });
    }
  } catch (error) {}

  try {
    var playerlist = [];
    digObj.players.forEach((x) => {
      playerlist += x.name + '\n';
    });
    if (digObj.players.length != 0) {
      embed.addFields({
        name: 'Players Online:',
        value: `${playerlist}`,
      });
    }
  } catch (error) {}

  message.channel.send(embed).catch((error) => message.reply(`${error}`));
  msg.delete();
};

module.exports.help = {
  name: 'serverinfo',
  usage: 'serverinfo <game>',
  info: 'Display info for game and check if server is online',
};
