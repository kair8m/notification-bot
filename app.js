require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
    ],
});

const {BOT_TOKEN} = process.env;

if (!BOT_TOKEN) {
    console.error('no token specified');
    process.exit(-1);
}

client.login(BOT_TOKEN);

client.on('message', (msg) => {
    console.log(msg);
});
