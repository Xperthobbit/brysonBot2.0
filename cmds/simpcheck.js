/* simpcheck.js */
const {
  reaper,
} = require("../botsettings.json"); /* Add this to your botsettings.json and use the ID of the user you wanna make a simp king */

module.exports.run = async (Client, message, args) => {
  let simp = function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  let level = simp(2);
  /*if (message.member.id === reaper) {
		message.channel
			.send(`You're a **KING SIMP** lol`)
			.catch((error) => message.reply(`${error}`));
	
	}*/ if (
    level === 1
  ) {
    message.channel
      .send(`You're not a SIMP! Good for you! :smile:`)
      .catch((error) => message.reply(`${error}`));
  } else {
    message.channel
      .send(`You're a **SIMP** :frowning:`)
      .catch((error) => message.reply(`${error}`));
  }
};

module.exports.help = {
  name: "simpcheck",
  usage: "simpcheck",
};
