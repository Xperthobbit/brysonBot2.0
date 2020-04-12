const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

const used = new Set();

module.exports.run = async (Client, message, args) => {
  /* Insert command code here */
  
	let king = function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	};

	if (used.has(message.author.id)) {
		return message.reply('Wait 12 hours  before using this command again');
	} else {
    message.channel.send(`Your KANG level is: ${king(101)}. :crown:`);
    used.add(message.author.id)
    setTimeout(() => {
      used.delete(used.message.author.id)
    }, 1000 * 60 * 60 * 12);
	}
};

module.exports.help = {
	name: 'kinglevel', // <-- Command name (what the user types after prefix)
	usage: 'Checks your king level', // <-- Usage (not nessasary but you can include if you need to)
};
