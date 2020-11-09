const Discord = require('discord.js'); /* Include this if you use embeds, etc. */
const Canvas = require('canvas');

module.exports.run = async (Client, message, args) => {
  function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return (
      url.indexOf('png', url.length - 'png'.length) !== -1 ||
      url.indexOf('jpg', url.length - 'jpg'.length) !== -1 ||
      url.indexOf('gif', url.length - 'gif'.length) !== -1
    );
  }

  if (message.attachments.size < 0)
    return message.reply('make sure you attach an image first!');
  if (message.attachments.size > 1)
    return message.reply('one image at a time please!');
  if (message.attachments.size == 1) {
    if (message.attachments.every(attachIsImage)) {
      const canvas = Canvas.createCanvas(1280, 720);
      const ctx = canvas.getContext('2d');
      const background = await Canvas.loadImage(message.attachments.first().url);
      canvas.width = background.width;
      canvas.height = background.height;
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      const overlay = await Canvas.loadImage('./2yxpv8.png');
      ctx.drawImage(overlay, 100, 10, canvas.width -20 , canvas.height -10);
      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        `aw-shit.png`
      );
      message.reply(attachment);
      message.delete();
    }
  }
};

module.exports.help = {
  name: 'ahshit',
  usage: 'ahshit <image>',
  info: 'Adds "Ah shit" overlay to image',
};
