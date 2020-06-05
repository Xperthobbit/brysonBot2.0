/* serverinfo.js */
/* Remember to edit the JSON file before editing the code in here! */
const Discord = require('discord.js');
const fs = require('fs');
/* const serverInfo = require('../serverinfo.json');  <-- Old method */

module.exports.run = async (Client, message, args) => {
	let msg = await message.channel.send('Checking my database...');
	let output = '';

	/* New Method; Dynamically reads json for any updates */
	let serverList = JSON.parse(fs.readFileSync('./serverinfo.json', 'utf8'));

	/*
	Ok so basically, this grabs data from the "servers" array, looks for object that has an array(specified in the call), 
	and if it finds it, takes the data from inside that object array and prints it into the embed.
	
	TLDR: Use this function for game server nested arrays :) 
	*/
	function nestedArray(array) {
		array.forEach((x) => {
			output += `**${x.Server}**:` + '\n' + x.IP;
			if (x.Port !== '') {
				output += ':' + x.Port;
			}
			output += '\n';
		});
	}

	function regArray(array) {
		array.forEach((x) => {
			if (x.Server === args[0]) {
				output = `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== '') {
					output += ':' + x.Port;
				}
				output += '\n';
				if (x.Password) {
					output += `Password: ${x.Password}`;
				}
			}
		});
	}

	function lastUpdatedDate(file) {
		const { mtime } = fs.statSync(file);
		return mtime;
	}

	/*
	Ok so I basically am yanderedev
	*/
	if (!args[0]) {
		msg.delete();
		return message.reply(
			`please include a game server you wish to get the details for! Or type 'all' for all of them.`
		);
		/* Edit your games with reg ex here */
	} else if (
		args[0].toLowerCase() === 'minecraft' ||
		args[0].toLowerCase() === 'mc'
	) {
		args[0] = 'Minecraft';
		serverList.servers.forEach((x) => {
			/*
			Change ".Minecraft" to the name of the game that has multiple servers!!
			
			REMEMBER TO CHANGE THE BOTTOM "ALL" ELSE STATEMENT TO THE NESTED ARRAY TOO! WILL MAKE THIS BETTER IN THE FUTURE HOPEFULLY!
			*/
			if (x.Minecraft) {
				nestedArray(x.Minecraft);
			}
		});
		/* Edit your games with reg ex here */
	} else if (
		args[0].toLowerCase() === 'openfortress' ||
		args[0].toLowerCase() === 'of'
	) {
		/* Edit me */
		args[0] = 'OpenFortress';
		regArray(serverList.servers);
	} else if (
		args[0].toLowerCase() === 'svencoop' ||
		args[0].toLowerCase() === 'sven'
	) {
		/* Edit me */
		args[0] = 'Sven-Coop';
		regArray(serverList.servers);
	} else if (
		args[0].toLowerCase() === 'garrysmod' ||
		args[0].toLowerCase() === 'gmod'
	) {
		args[0] = 'GarrysMod';
		regArray(serverList.servers);
	} else if (args[0].toLowerCase() === 'all') {
		serverList.servers.forEach((x) => {
			/* 
			REMEMBER TO CHANGE ".Minecraft" to the another game too! Create "else-if" statements for othergames until i make it better 
			*/
			if (x.Minecraft) {
				nestedArray(x.Minecraft);
			} else {
				output += `**${x.Server}**:` + '\n' + x.IP;
				if (x.Port !== '') {
					output += ':' + x.Port;
				}
				output += '\n';
			}
		});
	} else {
		msg.delete();
		return message.reply(`game server doesn't exist or invalid game!`);
	}

	var gameTitle = args[0].toUpperCase();
	const embed = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.setTitle(`${gameTitle} SERVER INFO:`)
		.setDescription(output)
		.setFooter(
			`*Information last updated ${lastUpdatedDate('serverinfo.json')
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
