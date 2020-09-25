const https = require("https");
const api = "https://www.canadacomputers.com/product_info.php?ajaxstock=true&itemid=181354";
const sourceFile = require("../server");
module.exports.run = async (Client, message, args) => {
  // Testing a website scan thing
  if (message.channel.id === "756372834447523927") {
    if (!args[0]) return message.reply(`please say on/off after the command!`);

    if (args[0] === "on") {
      if (!sourceFile.timedCheck) {
        sourceFile.timedCheck = setInterval(() => {
          https
            .get(api, (res) => {
              let body = "";

              res.on("data", (chunk) => {
                body += chunk;
                body = body.split("<")[0];
              });

              res.on("end", () => {
                try {
                  let json = JSON.parse(body);
                  if (json.avail > 0) {
                    let embed = new Discord.RichEmbed()
                      .setTimestamp()
                      .setTitle(`3080 IS AVAILABLE @ CC.CA!`)
                      .addField(json.avail, "available at the moment!")
                      .setFooter(`Created by bryson#1337`);
                    message.channel.send(embed);
                    clearInterval(sourceFile.timedCheck);
                  }
                  sourceFile.val = json.avail;
                } catch (error) {
                  console.error(error.message);
                }
              });
            })
            .on("error", (error) => {
              console.error(error.message);
            });
          if (sourceFile.val >= 1) {
            clearInterval(sourceFile.timedCheck);
            console.log(`Scan stopped successfully as embed trigger fired.`);
          }
        }, 3000);
        message.reply(`started a scan.`);
      } else {
        message.reply(`Already running a scan.`);
      }
    } else if (args[0] === "off" && sourceFile.timedCheck) {
      message.reply(`has turned off the scan.`);
      clearInterval(sourceFile.timedCheck);
      timedCheck = undefined;
      sourceFile.val = 0;
    } else {
      message.reply(`the scan is already off.`);
    }
  } else {
    message.reply(`sorry, this is reserved for testing in a secret channel...`);
  }
};

module.exports.help = {
  name: "ccscan",
  usage: "cscan <on/off>",
};
