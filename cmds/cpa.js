const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
  let Role = message.guild.roles.find(role => role.name === 'CPA/D');
  if (!Role) {
    return message.reply(
      `Sorry. This server does not have 'CPA/D' as a role... Talk to the server owner!`
    );
  }
  if (message.member.roles.has(Role.id)) {
    return message.reply('Sorry you already have that role!');
  } else {
    const embed2 = new Discord.RichEmbed()
      .setColor(0x5d2079)
      .addField('Username:', message.author.username)
      .setDescription("You've been given the CPA/D Role!")
      .setTimestamp()
      .setThumbnail(message.author.avatarURL);
    message.member.addRole(Role);
    message.reply(embed2);
  }
};

module.exports.help = {
  name: 'cpa',
  usage: 'cpa(/cpd)'
};
