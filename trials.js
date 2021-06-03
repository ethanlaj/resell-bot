let database = require('./database.js');
const { MessageEmbed } = require('discord.js');

const FREE_TRIAL = '849820964766089269';

const embedEnd = new MessageEmbed()
	.setColor('YELLOW')
	.setTitle('End of Free Trial')
	.setDescription('Your free one-week trial for the resell bot has ended. Subscribe to our patreon tier for $25/month to gain access to the bot again.\n\nLink: <https://www.patreon.com/resellbot>');

const embedStart = new MessageEmbed()
	.setColor('GREEN')
	.setTitle('Start of Free Trial')
	.setDescription('Your free one-week trial for the resell bot has started. After the free trial ends, you will need to subscribe to our patreon tier for $25/month to gain access to the bot again.\n\nLink: <https://www.patreon.com/resellbot>');

module.exports.run = async function (client) {
	for (let i = 0; i < database.allTrials.length; i++) {
		let guild = client.guilds.cache.get('848696206691663892');
		let member = await guild.members.fetch(database.allTrials[i].user_id);

		if (member && member.roles.cache.get(FREE_TRIAL) &&
            Date.now() >= Number(database.allTrials[i].expiration)) {
			member.roles.remove(FREE_TRIAL).then(() => {
				member.send(embedEnd).catch(() => {});
			});
		}
	}

	client.on('message', (message) => {
		if (message.content.toLowerCase() === '!trial') {
			if (database.allTrials.find((u) => u.user_id === message.author.id))
				return message.channel.send('You have already started a free trial');
			else {
				database.startTrial(message.author.id).then(() => {
					message.author.send(embedStart).catch(() => {});
					message.member.roles.add(FREE_TRIAL).catch(() => {});
					message.channel.send('Successfully started your free trial');
				}).catch(() => {
					message.channel.send('Something went wrong with starting your trial, please try again');
				});
			}
		}
	});
};