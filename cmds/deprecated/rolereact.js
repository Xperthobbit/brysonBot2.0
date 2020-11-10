const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
  if (!message.author.id === '184801768260108288') return;
  const myInfo = new Discord.MessageEmbed()
    .setTitle('Accepting da Rules')
    .setDescription(
      `Once you've read the rules, react to this post to gain access to the rest of the server.`
    );
  message.delete();
  message.channel.send(myInfo);
};
module.exports.help = {
    name: 'rolereact'
};
