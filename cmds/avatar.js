/* Avatar.js */
const Discord = require('discord.js'); /* Include this if you use embeds, etc. */

module.exports.run = async (Client, message, args) => {
  try {
    let msg = await message.channel.send('Generating profile image...');
    let user;
    if (args[0]) {
      if (!message.mentions.users.first()) {
        let memberid = message.guild.members.cache
          .filter((member) => {
            return member.user.username === args[0];
          })
          .map((member) => {
            return member.user.id;
          })
          .toString();
        if (!memberid) {
          return message.reply(
            'please provide the username (without the numbers) or @ the person.'
          );
        }
        user = Client.users.cache.get(memberid);
      } else {
        user = message.mentions.users.first();
      }
    } else {
      user = message.author;
    }
    const embed = new Discord.MessageEmbed()
      .setColor(0x5d2079)
      .setAuthor(user.username)
      .setImage(user.displayAvatarURL({ dynamic: true }));
    message.channel.send(embed).catch((error) => message.reply(`${error}`));
    msg.delete();
  } catch (error) {
    console.log(error);
  }
};

module.exports.help = {
  name: 'avatar',
  usage: 'avatar [user]',
};
