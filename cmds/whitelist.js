const Discord = require("discord.js");
const { exec } = require("child_process");
/* 

This will only work if you have a screen running for your minecraft server. 
And you run both the server and the bot on the same hardware. 

*/
module.exports.run = async (Client, message, args) => {
  let type = args[0];
  let usr = args[1];
  let msg;

  switch (type) {
    case "add":
      if (!usr) {
        return message.reply("please specify a Minecraft username!");
      }
      msg = await message.channel.send(`Adding ${usr} to the whitelist...`);
      /* The most scuffed use of exec in my entire life */
      exec(
        `tempfile=$(mktemp) && echo 'whitelist add ${usr}' | cat > $tempfile && screen -S minecraft1.16 -X readbuf $tempfile && screen -S minecraft1.16 -X paste . && rm -f $tempfile && sleep 1 && tail -1 /home/bryson/minecraft1.16/logs/latest.log | cut -d ":" -f 4`,
        (error, stdout, stderr) => {
          if (error) {
            return message.channel.send(`Failed! ${error}`);
          }
          if (stderr) {
            return message.channel.send(`stderr! ${stderr}`);
          }
          if (stdout) {
            const embed = new Discord.RichEmbed()
              .setColor(0x5d2079)
              .setTitle("Notice:")
              .setDescription(`${stdout}`);
            message.channel
              .send(embed)
              .catch((error) => message.reply(`${error}`));
            msg.delete();
          }
        }
      );
      break;
    case "remove":
      if (!usr) {
        return message.reply("please specify a Minecraft username!");
      }
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply(
          "only an admin of this discord can remove people from whitelist!"
        );
      }
      msg = await message.channel.send(`Removing ${usr} from the whitelist...`);
      exec(
        `tempfile=$(mktemp) && echo 'whitelist remove ${usr}' | cat > $tempfile && screen -S minecraft1.16 -X readbuf $tempfile && screen -S minecraft1.16 -X paste . && rm -f $tempfile && sleep 1 && tail -1 /home/bryson/minecraft1.16/logs/latest.log | cut -d ":" -f 4`,
        (error, stdout, stderr) => {
          if (error) {
            return message.channel.send(`Failed! ${error}`);
          }
          if (stderr) {
            return message.channel.send(`stderr! ${stderr}`);
          }
          if (stdout) {
            const embed = new Discord.RichEmbed()
              .setColor(0x5d2079)
              .setTitle("Notice:")
              .setDescription(`${stdout}`);
            message.channel
              .send(embed)
              .catch((error) => message.reply(`${error}`));
            msg.delete();
          }
        }
      );
      break;

    default:
      	/* 
    			Change the directory of your minecraft server.
    			Am very proud of this tho. Works like a charm :^)
    	*/
      msg = await message.channel.send(`Getting whitelist...`);
      exec(
        `tempfile=$(mktemp) && echo 'whitelist list' | cat > $tempfile && screen -S minecraft1.16 -X readbuf $tempfile && screen -S minecraft1.16 -X paste . && rm -f $tempfile && sleep 1 && tail -1 /home/bryson/minecraft1.16/logs/latest.log | cut -d ":" -f 5 | tr , '\n' | sort`,
        (error, stdout, stderr) => {
          if (error) {
            return message.channel.send(`Failed! ${error}`);
          }
          if (stderr) {
            return message.channel.send(`stderr! ${stderr}`);
          }
          if (stdout) {
            const embed = new Discord.RichEmbed()
              .setColor(0x5d2079)
              .setTitle("Whitelist:")
              .setDescription(`${stdout}`);
            message.channel
              .send(embed)
              .catch((error) => message.reply(`${error}`));
            msg.delete();
          }
        }
      );
      break;
  }
};

module.exports.help = {
  name: "whitelist",
  usage: "whitelist [add/remove] [minecraft username]",
};
