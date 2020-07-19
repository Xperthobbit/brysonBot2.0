/* hornyjail.js */
module.exports.run = async (Client, message, args) => {
  let usr = message.mentions.users.first();
  if (!usr) {
    message.reply("please tag a user!").catch((err) => message.reply(`${err}`));
  } else {
    message.channel
      .send(`${usr} `, { files: ["https://i.imgur.com/ydUaXNc.jpeg"] })
      .catch((err) => message.reply(`${err}`));
  }
};

module.exports.help = {
  name: "hornyjail",
  usage: "hornyjail <user>",
};
