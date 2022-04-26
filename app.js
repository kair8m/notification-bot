require('dotenv').config();
const Discord = require('discord.js');
const client = require('./client');

const { BOT_TOKEN } = process.env;

if (!BOT_TOKEN) {
  console.error('no token specified');
  process.exit(-1);
}

function setup() {
  client.on('message', (message) => {
    if (message.author.bot)
      return;
    if (message.channel.type !== 'GUILD_TEXT')
      return;
    if (message.channel.name !== 'bot-config')
      return;
    const user = client.channels.cache.get(message.channelId);
    const isAdmin = message.member.permissionsIn(message.channel).has('ADMINISTRATOR');
    if (!isAdmin) {
      client.channels(message.channel);
      return;
    }
    user.send('hi!');
  });

  setInterval(() => {
    for (const [channelId, channel] of client.channels.cache.entries()) {
      if (channel.type !== 'GUILD_TEXT')
        continue;
      channel.send('test');
    }
  }, 60 * 1000);
}

client.login(BOT_TOKEN)
  .then((r) => {
    console.log('Successfully connected');
    setup();
  })
  .catch((res) => {
    console.error(`Failed to login: ${res}`);
    process.exit(-1);
  });
