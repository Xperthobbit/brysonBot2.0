const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
    /* Insert command code here */
    let king = function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
    message.channel.send(`Your KANG level is: ${king(101)}. :crown:`);
};

module.exports.help = {
  name: 'kinglevel', // <-- Command name (what the user types after prefix)
  usage: 'Checks your king level' // <-- Usage (not nessasary but you can include if you need to)
};
