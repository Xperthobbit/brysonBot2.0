const Discord = require('discord.js');
const { version, author } = require('./package.json');
const { token, prefix } = require('./botsettings.json');
const Client = new Discord.Client({ disableEveryone: true });
const fs = require('fs');
Client.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 5;

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
		console.log('  Invite link: ' + link);
	} catch (err) {
		console.log(
			'  Failed to generate link! Here is what we know: ' + err.stack
		);
	}
	Client.user.setActivity(`Active in ${Client.guilds.size} servers`);
	console.log('Servers deployed in:');
	Client.guilds.forEach((guild) => {
		console.log(' - ' + guild.name);
	});
	console.log(' ');
	console.log(`version: ${version} by ${author}`);
	console.log('ready.');
});

/* On user join server */
Client.on('guildMemberAdd', (member) => {
	let Role = member.guild.roles.find(
		(role) =>
			role.name ===
			'Gamer' /* Edit this to the role you wish to make automatic */
	);
	const embed2 = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.addField('Username:', member.user.username)
		.setDescription('Welcome to the server!')
		.setTimestamp()
		.setThumbnail(member.user.avatarURL);
	try {
		member.addRole(Role);
	} catch (err) {
		console.log('There was an error adding user to role | ' + err.stack);
	}
	member.guild.channels
		.get('698680704770506885')
		.send(embed2); /* Edit This ID for your channel */
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

/* When a message is sent in the guild */
Client.on('message', async (message) => {
	/* Startup checks */
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	let messageCont = message.content.split(' ');
	let command = messageCont[0];
	let args = messageCont.slice(1);
	if (!command.startsWith(prefix)) return;

	if (cooldown.has(message.author.id)){
		return message.reply("lol stop spamming (Wait 5 seconds)")
	} else {
		let cmd = Client.commands.get(
			command.slice(prefix.length).toLowerCase()
		); /* Remove .toLowerCase if you don't want case sensitivity to be null */
		if (cmd) cmd.run(Client, message, args);
	
		setTimeout(() => {
			cooldown.delete(message.author.id)
		}, cdseconds * 1000);
	}
	cooldown.add(message.author.id);
});

Client.login(token);
