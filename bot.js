var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
console.log(user);
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 5) == '/roll') {
        let matches = message.match(/([0-9]+)(d)([0-9]+)(\+([0-9]+))?/i);

	let amount = matches[1];
	let dice = matches[3];
	let total = 0;
	for (let i = 0; i < amount; i++) {

		   total += parseInt(Math.floor(Math.random() * dice) + 1);

	}
	if (matches[5] != null) {
  total += parseInt(matches[5]);
}
console.log(channelID, total);
	bot.sendMessage({
                    to: channelID,
                    message: 'Rolled: ' + total
                });
     }
});