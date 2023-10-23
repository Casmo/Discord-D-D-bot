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
bot.on('message', function(user, userID, channelID, message, event) {

    let options = [];
    options.push("you'll have to farm");
    options.push("I plan on farming");
    options.push("That's a tough farm");
    options.push("That's a long farm");
    options.push("New character");
    options.push("New toon");
    options.push("Shiny");
    options.push("Shinies");

    for (i = 0; i < options.length; i++) {
        if (message.toLowerCase().includes(options[i].toLowerCase())) {

            bot.sendMessage({
                to: channelID,
                message: "I'm interested in that"
            });
            return;
        }
    }
    return;
if (["I'm planning on farming", "You'll have to farm"].includes(message)) {
    bot.sendMessage({
        to: channelID,
        message: "I'm interested in that"
    });
    return;
}
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