/* Avatar.js */

const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
	let msg = await message.channel.send('Generating profile image...');
	let usr = message.mentions.users.first() || message.author;
	const embed = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.setAuthor(usr.username)
		.setImage(usr.avatarURL);
	message.channel.send(embed).catch((error) => message.reply(`${error}`));
	msg.delete();
};

module.exports.help = {
	name: 'avatar',
	usage: 'avatar [user]',
};
