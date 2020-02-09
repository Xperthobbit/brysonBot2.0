const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
  if (!message.mentions.users.size) {
    return message.reply('Please specify users to vibecheck');
  }
  const List = message.mentions.users.map(user => {
    return `${user}`;
  });
  message.channel.send(
    `/////// ${List} ! You've just been 😎 **VIBE CHECKED** 😎 by ${message.author} \\\\\\\\\\\\\\\\\\\\\\\\\\\\`
  );
};

module.exports.help = {
  name: 'vibecheck',
  usage: 'vibecheck <user>'
};
