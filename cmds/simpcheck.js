const Discord = require('discord.js'); /* Include this if you use embeds, etc. */
const { reaper } = require('../botsettings.json'); /* Add this to your botsettings.json and use the ID of the user you wanna make a simp king */

module.exports.run = async (Client, message, args) => {
    /* Insert command code here */
    let simp = function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };
      let level = simp(2);
      if (message.member.id === reaper){
        message.channel.send(`You're a **KING SIMP** lol`)
      }
      else if (level === 1) {
        message.channel.send(`You're not a SIMP! Good for you! :smile:`)
      }
      else {
        message.channel.send(`You're a **SIMP** :frowning:`);
      }
};

module.exports.help = {
  name: 'simpcheck', // <-- Command name (what the user types after prefix)
  usage: 'simpcheck' // <-- Usage (not nessasary but you can include if you need to)
};

// Rename this file to <Command>.js 