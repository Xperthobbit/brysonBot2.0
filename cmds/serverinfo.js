const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
    /* Insert command code here */
    let msg = await message.channel.send("Checking my database...");
    let serverInfo = '';

    if (!args[0]) {
      msg.delete();
      return message.reply('please include a game server you wish to get the details for!');
    }
    else if (args[0] === 'minecraft' || args[0] === 'mc'){
      serverInfo = '**IP:** mc.cantfraglike.me \n **Port:**'; 
    }
    else if (args[0] === 'leftfordead2' || args[0] === 'left4dead2' || args[0] === 'l4d2') {
      serverInfo = '**IP:** 70.48.151.82 \n **Port:** 27015';
    }
    else {
      msg.delete();
      return message.reply(`game server doesn't exist or invalid game!`);
    }

    var gameTitle = args[0].toUpperCase();
    const embed = new Discord.RichEmbed()
    .setColor(0x5d2079)
    .setTitle(`${gameTitle} SERVER INFO:`)
    .setDescription(serverInfo)
    .setFooter(`*Information last updated 4/16/2020`)
    message.channel.send(embed);
    msg.delete();
};

module.exports.help = {
  name: 'serverinfo', // <-- Command name (what the user types after prefix)
  usage: 'serverinfo <game>' // <-- Usage (not nessasary but you can include if you need to)
};

// Rename this file to <Command>.js 