/* serverinfo.js */
/* Remember to edit the JSON file before editing the code in here! */
const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (Client, message, args) => {
	let msg = await message.channel.send('Checking my database...');
	const serverInfo = require('../serverinfo.json');
	let output = '';

	if (!args[0]) {
		msg.delete();
		return message.reply(
			`please include a game server you wish to get the details for! Or type 'all' for all of them.`
		);
		/* Edit your games with reg ex here */
	} else if (args[0] === 'minecraft' || args[0] === 'mc') {
		/* Edit me */
		args[0] = 'Minecraft';
		serverInfo.servers.forEach((x) => {
			if (x.Server === args[0]) {
				output = `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== '') {
					output += ':' + x.Port;
				}
				output += '\n';
			}
		});
		/* Edit me. If you don't have another mc server delete this */
		args[0] = 'RLCraft';
		serverInfo.servers.forEach((x) => {
			if (x.Server === args[0]) {
				output += `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== '') {
					output += ':' + x.Port;
				}
				output += '\n';
			}
		});
		args[0] === 'minecraft';
		/* Edit your games with reg ex here */
	} else if (args[0] === 'l4d2' || args[0] === 'left4dead2') {
		/* Edit me */
		args[0] = 'L4D2';
		serverInfo.servers.forEach((x) => {
			/* Edit me */
			if (x.Server === args[0]) {
				output = `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== '') {
					output += ':' + x.Port;
				}
				output += '\n';
			}
		});
		/* Edit your games with reg ex here */
	} else if (
		args[0] === 'csgo' ||
		args[0] === 'counterstrike' ||
		args[0] === 'cs'
	) {
		/* Edit me */
		args[0] = 'CSGO';
		serverInfo.servers.forEach((x) => {
			/* Edit me */
			if (x.Server === args[0]) {
				output = `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== '') {
					output += ':' + x.Port;
				}
				output += '\n';
			}
		});
	} else if ('all') {
		serverInfo.servers.forEach((x) => {
			output += `**${x.Server}**:` + '\n' + x.IP;
			if (x.Port !== '') {
				output += ':' + x.Port;
			}
			output += '\n';
		});
	} else {
		msg.delete();
		return message.reply(`game server doesn't exist or invalid game!`);
	}

	function createdDate(file) {
		const { birthtime } = fs.statSync(file);
		return birthtime;
	}

	var gameTitle = args[0].toUpperCase();
	const embed = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.setTitle(`${gameTitle} SERVER INFO:`)
		.setDescription(output)
		.setFooter(
			`*Information last updated ${createdDate('serverinfo.json')
				.toISOString()
				.replace('-', '/')
				.split('T')[0]
				.replace('-', '/')}`
		);
	message.channel.send(embed).catch((error) => message.reply(`${error}`));
	msg.delete();
};

module.exports.help = {
	name: 'serverinfo',
	usage: 'serverinfo <game> [all]',
};
