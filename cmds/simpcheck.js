/* simpcheck.js */
module.exports.run = async (Client, message, args) => {
  let simp = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  let level = simp(2);
  if (level === 1) {
    message.channel
      .send("You're not a SIMP! Good for you! :smile:")
      .catch((error) => message.reply(`${error}`));
  } else {
    message.channel
      .send("You're a **SIMP** :frowning:")
      .catch((error) => message.reply(`${error}`));
  }
};

module.exports.help = {
  name: 'simpcheck',
  usage: 'simpcheck',
  info: "Check if you're a simp"
};
