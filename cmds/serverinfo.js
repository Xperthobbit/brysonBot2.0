/* serverinfo.js */

const Discord = require('discord.js');

module.exports.run = async (Client, message, args) => {
	let msg = await message.channel.send('Checking my database...');
	let serverInfo = '';

	if (!args[0]) {
		msg.delete();
		return message.reply(
			'please include a game server you wish to get the details for!'
		);
	} else if (args[0] === 'minecraft' || args[0] === 'mc') {
		serverInfo = '**IP:** mc.cantfraglike.me \n **Port:**';
	} else if (
		args[0] === 'cs' ||
		args[0] === 'csgo'
	) {
		serverInfo = '**IP:** 70.48.151.82 \n **Port:** 27015';
	} else if (args[0] === 'tf2' || args[0] === 'teamfortress2') {
		serverInfo = '**IP:** 70.48.151.82 \n **Port:** 27066';
	} else {
		msg.delete();
		return message.reply(`game server doesn't exist or invalid game!`);
	}

	var gameTitle = args[0].toUpperCase();
	const embed = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.setTitle(`${gameTitle} SERVER INFO:`)
		.setDescription(serverInfo)
		.setFooter(`*Information last updated 4/18/2020`);
	message.channel.send(embed).catch((error) => message.reply(`${error}`));
	msg.delete();
};

module.exports.help = {
	name: 'serverinfo',
	usage: 'serverinfo <game>',
};
