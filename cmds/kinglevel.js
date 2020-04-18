/* kinglevel.js */

const used = new Map();
const Duration = require('humanize-duration');

module.exports.run = async (Client, message, args) => {

	let king = function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	};
	const cooldown = used.get(message.author.id);
	if (cooldown) {
		const remaining = Duration(cooldown - Date.now(), {
			units: ['h', 'm'],
			round: true,
		});
		return message
			.reply(
				`You have to wait ${remaining} before you can run this command again`
			)
			.catch((error) => message.reply(`${error}`));
	} else {
		let level = king(101);
		message.channel.send(`Your KING level is: ${level}. :crown:`);
		used.set(message.author.id, Date.now() + 1000 * 60 * 60 * 12);
		setTimeout(() => used.delete(message.author.id), 1000 * 60 * 60 * 12);
		if (level === 100) {
			let role = message.guild.roles.find((role) => role.name == 'KANGZ');
			let Member = message.guild.member(message.author);
			await Member.addRole(role);
			message
				.reply(
					`Congrats Kang! You hit :100: so you get the KANGZ role! :crown:`
				)
				.catch((error) => message.reply(`${error}`));
		}
	}
};

module.exports.help = {
	name: 'kinglevel',
	usage: 'kinglevel',
};
