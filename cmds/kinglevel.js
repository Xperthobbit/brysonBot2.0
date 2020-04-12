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
		let level = king(101);
		message.channel.send(`Your KANG level is: ${level}. :crown:`);
		used.add(message.author.id);
		setTimeout(() => {
			used.delete(used.message.author.id);
		}, 1000 * 60 * 60 * 12);
		if (level === 100) {
			let role = message.guild.roles.find((role) => role.name == 'KANGZ');
			let Member = message.guild.member(message.author);
			await Member.addRole(role);
			try {
				message.reply(
					`Congrats Kang! You hit :100: so you get the KANGZ role! :crown:`
				);
			} catch (err) {
				console.log('Role not found on server! Or failed because they have the role | ' + err.stack);
			}
		}
	}
};

module.exports.help = {
	name: 'kinglevel', // <-- Command name (what the user types after prefix)
	usage: 'Checks your king level', // <-- Usage (not nessasary but you can include if you need to)
};
