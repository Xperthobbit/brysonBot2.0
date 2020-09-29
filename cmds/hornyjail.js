/* hornyjail.js */
module.exports.run = async (Client, message, args) => {
  let usr;
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
          'please provide a valid username (without the numbers) or @ the person.'
        );
      }
      usr = Client.users.cache.get(memberid);
    } else {
      usr = message.mentions.users.first();
    }
  } else {
    usr = message.author;
  }
  message.channel
    .send(`${usr} `, { files: ['https://i.imgur.com/ydUaXNc.jpeg'] })
    .catch((err) => message.reply(`${err}`));
};

module.exports.help = {
  name: 'hornyjail',
  usage: 'hornyjail <user>',
};
