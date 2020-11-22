const { OpusEncoder } = require('@discordjs/opus');

module.exports.run = async (Client, message, args) => {
  var user;

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
  if (!message.member.hasPermission('ADMINISTRATOR') && user.id !== message.author.id) {
    return message.reply(
      'you can only use this command on yourself. Admins can do it to everyone. :^)'
    );
  }
  const showerChannel = '779527491177152512';
  if (message.guild.member(user).voice.channel) {
    await message.guild.member(user).voice.setChannel(showerChannel);
    const connection = await message.guild.member(user).voice.channel.join();
    const dispatcher = connection.play('shower.mp3', { volume: 0.5 });

    dispatcher.on('finish', () => {
       connection.disconnect();
    });
    dispatcher.on('error', console.error);
  }
};

module.exports.help = {
  name: 'shower',
  usage: 'shower <user>',
  info: 'Moves sweaty player to shower',
};
