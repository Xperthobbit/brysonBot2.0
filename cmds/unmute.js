/* unmute.js */
const fs = require('fs');
const removedRoles = require('../mutes.json');
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

  if (!Member.roles.cache.has(muteRole))
    return message.reply('user already unmuted.');

  if (!removedRoles.hasOwnProperty(Member.id)) {
    return message.reply(
      'ERROR! User roles missing! Something bad happened...'
    );
  }

  try {
    await Member.roles.remove(muteRole).then(
      removedRoles[Member.id].ids.forEach((r) => {
        Member.roles.add(r);
      })
    );
  } catch (error) {
    message.reply(`Error: ${error}`);
  }

  try {
    Member.voice.setMute(false).catch((err) => {
      console.log(err);
    });
  } catch (error) {
    message.reply(`Error: ${error}`);
  }

  delete removedRoles[Member.id];

  fs.writeFile('./mutes.json', JSON.stringify(removedRoles), (err) => {
    if (err) console.log(err);
  });

  message.channel
    .send(`${user} has been unmuted.`)
    .catch((error) => message.reply(`${error}`));
};

module.exports.help = {
  name: 'unmute',
  usage: 'unmute <user>',
  info: 'Unmute user (Admin Only)',
};
