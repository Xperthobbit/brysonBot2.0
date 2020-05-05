/* kinglevel.js */
const cooldownTime = 1000 * 60 * 60 * 12; /* 12 hours */
const cooldowns = require('../cooldowns.json');
const Duration = require('humanize-duration');
const fs = require('fs');

module.exports.run = async (Client, message, args) => {
	let king = function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	};

	const userID = message.author.id;

	if (!cooldowns.hasOwnProperty(userID)) {
		cooldowns[userID] = {
			TimeRemaining: 0,
		};
	} else if (cooldowns[userID].TimeRemaining < 0) {
		cooldowns[userID] = {
			TimeRemaining: 0,
		};
	}

	const timeleft = new Date(cooldowns[userID].TimeRemaining);

	let check = timeleft - Date.now() >= timeleft || timeleft - Date.now() <= 0;

	if (!check) {
		const remaining = Duration(timeleft - Date.now(), {
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
		cooldowns[userID] = {
			TimeRemaining: Date.now() + cooldownTime,
		};
		fs.writeFile('./cooldowns.json', JSON.stringify(cooldowns), (err) => {
			if (err) console.log(err);
		});
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
