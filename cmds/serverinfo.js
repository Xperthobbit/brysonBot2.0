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
      args[0] = 'tf2';
      serverList.servers.forEach((x) => {
        if (x.tf2) {
          regArray(x.tf2);
          gameName(x.tf2);
        }
      });
      break;
    case 'rust':
    case 'Rust':
    case 'r':
      args[0] = 'rust';
      serverList.servers.forEach((x) => {
        if (x.rust) {
          regArray(x.rust);
          gameName(x.rust);
        }
      });
      break;
    case 'l4d2':
      args[0] = 'l4d2';
      serverList.servers.forEach((x) => {
        if (x.l4d2) {
          regArray(x.l4d2);
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
    case 'csgo':
      args[0] = 'csgo';
      serverList.servers.forEach((x) => {
        if (x.csgo) {
          regArray(x.csgo);
          gameName(x.csgo);
        }
      });
      break;
    // case 'all':
    //   /* I still don't know how to make this better... */
    //   serverList.servers.forEach((x) => {
    //     if (x.Minecraft) regArray(x.Minecraft);
    //     if (x.OpenFortress) regArray(x.OpenFortress);
    //     if (x.Rust) regArray(x.Rust);
    //     if (x.l4d2) regArray(x.l4d2);
    //     if (x.GarrysMod) regArray(x.GarrysMod);
    //     if (x.csgo) regArray(x.csgo);
    //   });
    //   break;
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

  if (!errorcode && output.password && gameTitle !== 'MINECRAFT') {
    var embed = new Discord.MessageEmbed()
      .setColor(0x5d2079)
      .setTitle(`${gameTitle} SERVER INFO:`)
      .setThumbnail('https://img.icons8.com/plasticine/2x/server.png')
      .setFooter(
        `Server query made by bryson#1337 using GameDig API`,
        'https://cdn.discordapp.com/emojis/522898117238980618.png?v=1'
      )
      .addFields(
        { name: 'Server Name:', value: `${digObj.name}` },
        { name: 'IP:', value: `${output.ip}` },
        { name: 'Port:', value: `${output.port}` },
        { name: 'Password Required?', value: `${digObj.password}` },
        { name: 'Password:', value: `${output.password}` },
        { name: 'Map:', value: `${digObj.map}` },
        //{ name: 'Active Players:', value: `${digObj.players}` },
        { name: 'Ping:', value: `${digObj.ping}` }
      );
  } else if (!errorcode && gameTitle === 'MINECRAFT') {
    var embed = new Discord.MessageEmbed()
      .setColor(0x5d2079)
      .setTitle(`${gameTitle} SERVER INFO:`)
      .setThumbnail('https://img.icons8.com/plasticine/2x/server.png')
      .setFooter(
        `Server query made by bryson#1337 using GameDig API`,
        'https://cdn.discordapp.com/emojis/522898117238980618.png?v=1'
      )
      .addFields(
        { name: 'Server Name:', value: `${digObj.name}` },
        { name: 'Port:', value: `${output.ip}` },
        { name: 'Port:', value: `${output.port}` },
        { name: 'Password Required?', value: `${digObj.password}` },
        { name: 'Ping:', value: `${digObj.ping}` }
      );
  } else if (!errorcode && !output.password) {
    var embed = new Discord.MessageEmbed()
      .setColor(0x5d2079)
      .setTitle(`${gameTitle} SERVER INFO:`)
      .setThumbnail('https://img.icons8.com/plasticine/2x/server.png')
      .setFooter(
        `Server query made by bryson#1337 using GameDig API`,
        'https://cdn.discordapp.com/emojis/522898117238980618.png?v=1'
      )
      .addFields(
        { name: 'Server Name:', value: `${digObj.name}` },
        { name: 'IP:', value: `${output.ip}` },
        { name: 'Port:', value: `${output.port}` },
        { name: 'Password Required?', value: `${digObj.password}` },
        { name: 'Map:', value: `${digObj.map}` },
        { name: 'Ping:', value: `${digObj.ping}` }
      );
  } else {
    var embed = new Discord.MessageEmbed()
      .setColor(0x5d2079)
      .setTitle(`${gameTitle} SERVER INFO:`)
      .setThumbnail('https://img.icons8.com/plasticine/2x/server.png')
      .setFooter(
        `Server query made by bryson#1337 using GameDig API`,
        'https://cdn.discordapp.com/emojis/522898117238980618.png?v=1'
      )
      .addFields(
        { name: 'IP:', value: `${output.ip}` },
        { name: 'Port:', value: `${output.port}` },
        { name: 'Server Query:', value: 'FAILED!' },
        { name: 'Reason:', value: errorcode }
      );
  }
  message.channel.send(embed).catch((error) => message.reply(`${error}`));
  msg.delete();
};

module.exports.help = {
  name: 'serverinfo',
  usage: 'serverinfo <game>',
  info: 'Display info for game and check if server is online',
};
