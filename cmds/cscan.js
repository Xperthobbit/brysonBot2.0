const https = require('https');
const api =
  'https://www.canadacomputers.com/product_info.php?ajaxstock=true&itemid=181354';
const sourceFile = require('../server');
module.exports.run = async (Client, message, args) => {
  if (!args[0]) return message.reply('please say on/off after the command.');
  if (args[1]) return message.reply('too many arguments.');

  switch (args[0]) {
    case 'on':
      if (!sourceFile.timedCheck) {
        sourceFile.timedCheck = setInterval(() => {
          https
            .get(api, (res) => {
              let body = '';

              res.on('data', (chunk) => {
                body += chunk;
                body = body.split('<')[0];
              });

              res.on('end', () => {
                try {
                  let json = JSON.parse(body);
                  if (json.avail > 0) {
                    let embed = new Discord.RichEmbed()
                      .setColor('#003366')
                      .seturl(
                        'https://www.canadacomputers.com/product_info.php?cPath=43_557_559&item_id=181354'
                      )
                      .setTitle('GTX 3080 Available @ Canada Computers')
                      .addField(json.avail, 'available at the moment!')
                      .setFooter('Created by bryson#1337')
                      .setTimestamp();
                    message.channel.send(embed);
                  }
                  sourceFile.val = json.avail;
                } catch (error) {
                  console.error(error.message);
                }
              });
            })
            .on('error', (error) => {
              console.error(error.message);
            });
          if (sourceFile.val >= 1) {
            clearInterval(sourceFile.timedCheck);
            sourceFile.timedCheck = undefined;
          }
        }, 3000);
        message.reply('started command.');
      } else {
        message.reply('command already running.');
      }
      break;
    case 'off':
      if (args[0] === 'off' && sourceFile.timedCheck) {
        message.reply('command stopped.');
        clearInterval(sourceFile.timedCheck);
        timedCheck = undefined;
        sourceFile.val = 0;
      } else {
        message.reply('the command is not running.');
      }
      break;
    default:
      message.reply('invalid arguments.');
      break;
  }
};

module.exports.help = {
  name: 'cscan',
  usage: 'cscan <on/off>',
};
