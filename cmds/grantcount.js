/* grantcount.js */
const fs = require("fs");

module.exports.run = async (Client, message, args) => {
  /* Insert command code here */
  let count = JSON.parse(fs.readFileSync("./count.json", "utf8"));

  let curcount = count.count;

  message.channel.send(
    `Grant has said he'll stop but hasn't ${curcount} times.`
  );

  curcount = {
    count: curcount + 1,
  };

  fs.writeFile("./count.json", JSON.stringify(curcount), (err) => {
    if (err) console.log(err);
  });
};

module.exports.help = {
  name: "grantcount",
  usage: "grantcount",
};
