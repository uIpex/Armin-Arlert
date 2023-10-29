require('dotenv').config();

const { token } = process.env;
const keepAlive = require('./keepAlive.js');
const fs = require('fs');

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildMessageReactions, GuildScheduledEvents } = GatewayIntentBits
const client = new Client({ intents: [Guilds, GuildMembers, GuildMessages, MessageContent, DirectMessages, GuildMessageReactions, GuildScheduledEvents], partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User] });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`)
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(token);