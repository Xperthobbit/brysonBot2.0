/* Clear.js */
module.exports.run = async (Client, message, args) => {
  if (!args[0] || args[0] < 2 || args[0] > 100)
    return message.reply(
      "please define how many messages you want cleared!(Max 100!)"
    );
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      "you need to have permisson: MANAGE_MESSAGES. :frown:"
    );
  message.channel
    .bulkDelete(args[0])
    .catch((error) => message.reply(`${error}`));
};

module.exports.help = {
  name: "clear",
  usage: "clear <#>",
};
