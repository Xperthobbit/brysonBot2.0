const Discord = require('discord.js'); /* Include this if you use embeds, etc. */
var request = require('request');
const mcIP = 'mc.cantfraglike.me';
const mcPort = '25565';

module.exports.run = async (Client, message, args) => {
	/* Insert command code here */
	var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
	request(url, function (err, response, body) {
		if (err) {
			console.log(err);
			return message.reply('Error getting Minecraft server status...');
		}
		body = JSON.parse(body);
		var status = '*Minecraft server is currently offline*';
		if (body.online) {
			status = '**Minecraft** server is **online**  -  ';
			if (body.players.now) {
				status += '**' + body.players.now + '** people are playing right now!';
			} else {
				status += '*Nobody is playing!*';
			}
		}
		const embed = new Discord.RichEmbed()
			.setColor(0x5d2079)
			.setTitle('Minecraft Server Status')
			.setDescription(status);
		try {
			message.channel.send(embed);
		} catch (err) {
			message.channel.send(err);
		}
	});
};

module.exports.help = {
	name: 'mcstatus', // <-- Command name (what the user types after prefix)
	usage: 'mcstatus', // <-- Usage (not nessasary but you can include if you need to)
};

// Rename this file to <Command>.js
