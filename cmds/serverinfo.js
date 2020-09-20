/* serverinfo.js */
/* Remember to edit the JSON file before editing the code in here! */
const Discord = require("discord.js");
const fs = require("fs");
/* const serverInfo = require('../serverinfo.json');  <-- Old method */

module.exports.run = async (Client, message, args) => {
	let msg = await message.channel.send("Checking my database...");
	let output = "";

	/* New Method; Dynamically reads json for any updates */
	let serverList = JSON.parse(fs.readFileSync("./serverinfo.json", "utf8"));

	/*
	Ok so basically, this grabs data from the "servers" array, looks for object that has an array(specified in the call), 
	and if it finds it, takes the data from inside that object array and prints it into the embed.
	
	TLDR: Use this function for game server nested arrays :) 
	*/
	function regArray(array) {
		array.forEach((x) => {
			output += `__**${x.Server}**__: ` + "\n" + "**IP:** " + x.IP;
			if (x.Port !== "") {
				output += "\n" + "**Port:** " + x.Port;
			}
			output += "\n";
			if (x.Password) {
				output += `**Password**: ${x.Password}`;
				output += "\n";
			}
		});
	}

	function lastUpdatedDate(file) {
		const { mtime } = fs.statSync(file);
		return mtime;
	}

	switch (args[0]) {
		case "minecraft":
		case "mc":
			args[0] = "Minecraft";
			serverList.servers.forEach((x) => {
				if (x.Minecraft) {
					regArray(x.Minecraft);
				}
			});
			break;
		case "openfortress":
		case "of":
			args[0] = "OpenFortress";
			serverList.servers.forEach((x) => {
				if (x.OpenFortress) {
					regArray(x.OpenFortress);
				}
			});
			break;
		case "rust":
		case "Rust":
		case "r":
			args[0] = "Rust";
			serverList.servers.forEach((x) => {
				if (x.Rust) {
					regArray(x.Rust);
				}
			});
			break;
		case "arma2":
		case "dayz":
			args[0] = "Arma 2 DayZ";
			serverList.servers.forEach((x) => {
				if (x.Arma2) {
					regArray(x.Arma2);
				}
			});
			break;
		case "garrysmod":
		case "gmod":
			args[0] = "GarrysMod";
			serverList.servers.forEach((x) => {
				if (x.GarrysMod) {
					regArray(x.GarrysMod);
				}
			});
			break;
		case "csgo":
			args[0] = "csgo";
			serverList.servers.forEach((x) => {
				if (x.csgo) {
					regArray(x.csgo);
				}
			});
			break;
		case "all":
			/* I still don't know how to make this better... */
			serverList.servers.forEach((x) => {
				if (x.Minecraft) regArray(x.Minecraft);
				if (x.OpenFortress) regArray(x.OpenFortress);
				if (x.Rust) regArray(x.Rust);
				if (x.Arma2) regArray(x.Arma2);
				if (x.GarrysMod) regArray(x.GarrysMod);
			});
			break;
		case undefined:
			msg.delete();
			return message.reply(
				`please include a game server you wish to get the details for! Or type 'all' for all of them.`
			);
			break;
		default:
			msg.delete();
			return message.reply(`game server doesn't exist or invalid game!`);
			break;
	}

	var gameTitle = args[0].toUpperCase();
	const embed = new Discord.RichEmbed()
		.setColor(0x5d2079)
		.setTitle(`${gameTitle} SERVER INFO:`)
		.setDescription(output)
		.setFooter(
			`*Information last updated ${lastUpdatedDate("serverinfo.json")
				.toISOString()
				.replace("-", "/")
				.split("T")[0]
				.replace("-", "/")}`
		);
	message.channel.send(embed).catch((error) => message.reply(`${error}`));
	msg.delete();
};

module.exports.help = {
	name: "serverinfo",
	usage: "serverinfo <game>/[all]",
};
