/* kinglevel.js */
const cooldownTime = 1000 * 60 * 60 * 12; /* 12 hours */
const cooldowns = require('../cooldowns.json');
const Duration = require('humanize-duration');
const fs = require('fs');
const { Message } = require('discord.js');

module.exports.run = async (Client, message, args) => {
  let kingrole = '698681216563544134';
  if (message.channel.id === '698741020329771039') {
    let king = function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    };

    const userID = message.author.id;
    const Member = message.guild.member(message.author);

    if (!cooldowns.hasOwnProperty(userID)) {
      cooldowns[userID] = {
        TimeRemaining: 0,
      };
    } else if (cooldowns[userID].TimeRemaining < 0) {
      cooldowns[userID] = {
        TimeRemaining: 0,
      };
    }

    const timeleft = new Date(cooldowns[userID].TimeRemaining);

    let check = timeleft - Date.now() >= timeleft || timeleft - Date.now() <= 0;

    if (!check) {
      const remaining = Duration(timeleft - Date.now(), {
        units: ['h', 'm'],
        round: true,
      });
      return message
        .reply(
          `You have to wait ${remaining} before you can run this command again`
        )
        .catch((error) => message.reply(`${error}`));
    } else {
      let level = king(101);
      message.channel.send(`Your KING level is: ${level}. :crown:`);
      cooldowns[userID] = {
        TimeRemaining: Date.now() + cooldownTime,
      };

      fs.writeFile('./cooldowns.json', JSON.stringify(cooldowns), (err) => {
        if (err) console.log(err);
      });

      if (level === 100) {
        if (!message.member.roles.cache.find((r) => r.id === kingrole)) {
          await Member.roles.add(kingrole);
          message
            .reply(
              'Congrats Kang! You hit :100: so you get the KANGZ role! :crown:'
            )
            .catch((error) => message.reply(`${error}`));
        } else message.reply('Congrats again for hitting that :100:');
      } else if (level === 0 || level === 1) {
        if (message.member.roles.cache.find((r) => r.id === kingrole)) {
          await Member.roles.remove(kingrole);
          message
            .reply('sorry scrub! You just lost your KANGZ role! :crown:')
            .catch((error) => message.reply(`${error}`));
        } else message.reply(`imagine hitting ${level} when ur not even a kang yet LOL :monkey:`);
      }
    }
  } else {
    return message.reply(
      'please type the command inside the respective channel! (#king-levels)'
    );
  }
};

module.exports.help = {
  name: 'kinglevel',
  usage: 'kinglevel',
  info: 'Check your kinglevel!',
};
