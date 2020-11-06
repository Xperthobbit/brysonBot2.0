/* mute.js */
module.exports.run = async (Client, message, args) => {
  let user;
  let muteRole = '701729671393443840'; // <-- Change me

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return message.reply(
      'nice try. You need Administrator rights to do that. :monkey:'
    );
  }

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

  const Member = message.guild.member(user);
  if (Member.roles.cache.has(muteRole))
    return message.reply('user already muted.');

  try {
    Member.roles.add(muteRole);
  } catch (error) {
    message.reply(`Error: ${error}`);
  }
  try {
    Member.voice.setMute(true);
  } catch (error) {
    message.reply(`Error: ${error}`);
  }

  message.channel
    .send(`${user} has been muted lol.`)
    .catch((error) => message.reply(`${error}`));
};

module.exports.help = {
  name: 'mute',
  usage: 'mute <user>',
  info: 'Mutes user (Admin only)'
};
