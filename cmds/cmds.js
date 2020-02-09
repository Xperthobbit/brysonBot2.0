const Discord = require('discord.js'); /* Include this if you use embeds, etc. */
const fs = require('fs');
const { prefix } = require('../botsettings.json');

module.exports.run = async (Client, message, args) => {
  fs.readdir('./cmds/', (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
      message.channel.send('No commands on file. Talk to the Server Admin');
      return;
    }

    let filesArray = [];

    let result = jsfiles.forEach((f, i) => {
      let props = require(`./${f}`);
      filesArray.push(`**${prefix}${props.help.name}** \nUsage: ${props.help.usage}\n`) ;
    });
    filesArray.sort();
    const embed = new Discord.RichEmbed()
      .setColor(0x5d2079)
      .setTitle('Commands:')
      .setDescription(filesArray);
    try {
      message.channel.send(embed);
    } catch (err) {
      message.channel.send(err);
    }
  });
};

module.exports.help = {
  name: 'cmds',
  usage: 'cmds'
};
