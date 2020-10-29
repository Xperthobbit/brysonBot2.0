const Discord = require('discord.js');
const { version, author } = require('./package.json');
const { token, prefix, general } = require('./botsettings.json');
const Client = new Discord.Client({ disableEveryone: true });
const fs = require('fs');
Client.commands = new Discord.Collection();
const Duration = require('humanize-duration');
let used = new Map();
let cdseconds = 5;

/* Checks for commands in cmds folder */
fs.readdir('./cmds/', (err, files) => {
  if (err) console.error(err);

  let jsFile = files.filter((x) => x.split('.').pop() === 'js');
  if (jsFile.length <= 0) {
    console.log('No commands in cmds!');
    return;
  }

  console.log(`Loading ${jsFile.length} cmds... `);

  jsFile.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    Client.commands.set(props.help.name, props);
  });
});

/* On bot activation/startup/boot */
Client.on('ready', async () => {
  console.log(`${Client.user.username} activated.`);
  try {
    let link = await Client.generateInvite(['ADMINISTRATOR']);
    console.log('Invite link: ' + link);
  } catch (err) {
    console.log('Failed to generate link! Here is what we know: ' + err.stack);
  }
  Client.user.setActivity(`Nice Server Bryson`, { type: 'WATCHING' });
  // console.log('Servers deployed in:');
  // Client.guilds.forEach((guild) => {
  //   console.log(' - ' + guild.name);
  // });
  // Deprecated
  console.log(' ');
  console.log(`version: ${version} by ${author}`);
  console.log('ready.');
});

/* On user join server */
Client.on('guildMemberAdd', (member) => {
  const embed2 = new Discord.MessageEmbed()
    .setColor(0x5d2079)
    .addField('Username:', member.user.username)
    .setDescription('Welcome to the server!')
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
  try {
    member.roles.add('698681043015827466');
  } catch (err) {
    console.log('There was an error adding user to role!');
  }
  try {
    guild.channels.cache
      .find(
        (i) => i.name === 'general-chat'
      )
      .send(embed2);
  } catch (err) {
    console.log('Guild channel not found!' + err);
  }
});

/* On user leaves server */
Client.on('guildMemberRemove', (member) => {
  const embed2 = new Discord.MessageEmbed()
    .setColor(0x5d2079)
    .addField('Username:', member.user.username)
    .setDescription('Goodbye!')
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
  try {
    guild.channels.cache
      .find(
        (i) => i.name === 'general-chat'
      )
      .send(embed2);
  } catch (err) {
    console.log('Guild channel not found!' + err);
  }
});

/* If bot is added to a guild while activated */
Client.on('guildCreate', (guild) => {
  console.log(
    `New Server joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  Client.user.setActivity(`Active in ${Client.guilds.size} servers`);
});

/* If bot is removed from a guild while activated */
Client.on('guildDelete', (guild) => {
  console.log(`I have been kicked from: ${guild.name} (id: ${guild.id})`);
  Client.user.setActivity(`Active in ${Client.guilds.size} servers`);
});

/* If bot loses connection, auto reconnect */
Client.on('disconnected', () => {
  console.log('Disconnected!');
  console.log('Reconnecting...');
  Client.login(token);
});

/* Export variables for commands */
module.exports.timedCheck = undefined;
module.exports.val = 0;

/* When a message is sent in the guild */
Client.on('message', async (message) => {
  /* Startup checks */
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  let messageCont = message.content.split(' ');
  let command = messageCont[0];
  if (command === `${prefix}commands`) command = `${prefix}cmds`;
  let args = messageCont.slice(1);
  if (!command.startsWith(prefix)) {
    let who = function getRandomInt() {
      return Math.floor(Math.random() * Math.floor(1200));
    };

    let check = who();

    switch (check) {
      case 1:
        message.reply('who asked?');
        break;
      case 2:
        message.reply({ files: ['./No one cares.mp4'] });
        break;
      case 3:
        message.reply({ files: ['./shutit.mp4'] });
        break;
      case 20:
        message.reply({ files: ['./video0_2.mp4'] });
        break;
      case 40:
        message.reply(`that's cringe. :grimacing:`);
        break;
      case 69:
        message.reply({ files: ['./no one asked faggot.mp4'] });
      default:
        return;
    }
  }

  let cmd = Client.commands.get(
    command.slice(prefix.length).toLowerCase()
  ); /* Remove .toLowerCase if you don't want case sensitivity to be null */
  if (cmd) cmd.run(Client, message, args);

  // const cooldown = used.get(message.author.id);

  // if (cooldown) {
  //   const remaining = Duration(cooldown - Date.now(), {
  //     units: ["s"],
  //     round: true,
  //   });
  //   return message.reply(`lol stop spamming (Wait ${remaining})`);
  // } else {
  // }
  // used.set(message.author.id, Date.now() + cdseconds * 1000);
  // setTimeout(() => used.delete(message.author.id), cdseconds * 1000);
});

Client.login(token);
