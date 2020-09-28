/* hornyjail.js */
module.exports.run = async (Client, message, args) => {
  let usr = client.users.find((user) => user.username == args[0]);
  if (!usr) {
    message.reply('user not found.').catch((err) => message.reply(`${err}`));
  } else {
    message.channel
      .send(`${usr} `, { files: ['https://i.imgur.com/ydUaXNc.jpeg'] })
      .catch((err) => message.reply(`${err}`));
  }
};

module.exports.help = {
  name: 'hornyjail',
  usage: 'hornyjail <user>',
};
