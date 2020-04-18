/* cmds.js */
/* Don't touch this please. Unless you don't want cmds to work. */

const Discord = require('discord.js');
const fs = require('fs');
const { prefix } = require('../botsettings.json');

module.exports.run = async (Client, message, args) => {
	fs.readdir('./cmds/', (err, files) => {
		if (err) console.error(err);
		let jsfiles = files.filter((f) => f.split('.').pop() === 'js');
		if (jsfiles.length <= 0) {
			return message.channel.send(
				'No commands on file. Talk to the Server Admin'
			);
		}

		let filesArray = [];

		jsfiles.forEach((f, i) => {
			let props = require(`./${f}`);
			filesArray.push(
				`**${prefix}${props.help.name}** \nUsage: ${props.help.usage}\n`
			);
		});
		filesArray.sort();
		const embed = new Discord.RichEmbed()
			.setColor(0x5d2079)
			.setTitle('Commands:')
			.setDescription(filesArray)
			.setFooter('*<> means required, [] means optional');
		message.channel.send(embed).catch((error) => message.reply(`${error}`));
	});
};

module.exports.help = {
	name: 'cmds',
	usage: 'cmds',
};
