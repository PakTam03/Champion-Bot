const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', function(){
	bot.user.setActivity('Working on Heroku')
})
bot.login(process.env.token)