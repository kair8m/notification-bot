require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']
});

const {BOT_TOKEN} = process.env;

if (!BOT_TOKEN) {
  console.error('no token specified');
  process.exit(-1);
}

function setup() {
  client.on('message', (message) => {
    if (message.author.bot)
      return;
    const isAdmin = message.member.permissionsIn(message.channel).has('ADMINISTRATOR');
    if (!isAdmin) {
      client.channels(message.channel);
      return;
    }

    const user = client.channels.cache.get(message.channelId);
    user.send('hi!');
  });
}

client.login(BOT_TOKEN).then((r) => {
  console.log('Successfully connected');
  setup();
})
  .catch((res) => {
    console.error(`Failed to login: ${res}`);
    process.exit(-1);
  });
