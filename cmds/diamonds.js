const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (Client, message, args) => {
    /* Insert command code here */
    let count = JSON.parse(fs.readFileSync('./diamonds.json', 'utf8'));
    let user = message.author;
    let curcount = count.count;

    message.channel.send(`${user} found Diamonds! ${curcount} people have found diamonds.`);

    curcount = {
      count: curcount + 1
    };

    fs.writeFile('./diamonds.json', JSON.stringify(curcount), (err) => {
        if (err) console.log(err);
    });
};

module.exports.help = {
  name: 'diamonds', 
  usage: 'diamonds' 
};