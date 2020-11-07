const Discord = require('discord.js'); /* Include this if you use embeds, etc. */
module.exports.run = async (Client, message, args) => {
  let userMention;
  let member = message.mentions.members.first() || message.member;
  // const userMention = message.mentions.users.first() || message.author;
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
      userMention = Client.users.cache.get(memberid);
    } else {
      userMention = message.mentions.users.first();
    }
  } else {
    userMention = message.author;
  }

  let userinfo = {};
  userinfo.joindate = member.joinedAt;
  userinfo.createdat = userMention.createdAt;
  userinfo.presen = userMention.presence;
  userinfo.tag = userMention.tag;
  userinfo.uname = userMention.username;

  userinfo.avatar = userMention.displayAvatarURL({ dynamic: true,  size: 4096 });

  var myInfo = new Discord.MessageEmbed()
    .setAuthor(userinfo.uname, userinfo.avatar)
    .addField('Joined Server', userinfo.joindate, false)
    .addField('Created At', userinfo.createdat, false)
    .addField('Client Tag', userinfo.tag, false)
    .setColor(0x5d2079)
    .setTitle('User Info:')
    .setThumbnail(userinfo.avatar);

  message.channel.send(myInfo);
};

module.exports.help = {
  name: 'userinfo',
  usage: 'userinfo [name]',
  info: 'Display basic user information'
};
