const { MessageEmbed } = require("discord.js");

const CATEGORY_ID = "848914366421401612";
const ERROR = "848696206691663895";

module.exports = {
	fetchMessages: async function (client) {
		let channels = client.channels.cache.get(CATEGORY_ID).children;
		for (let channel of channels.array())
		{
			await channel.messages.fetch();
		}
		return;
	},
	run: async function (client) {
		client.on("messageReactionAdd", (messageReaction, user) => {
			if (messageReaction.message.channel.parentID === CATEGORY_ID &&
            messageReaction.emoji.name === "⭐" &&
            user.id !== "848696353148108800" &&
            messageReaction.message.embeds[0]) {
				user.send(new MessageEmbed(messageReaction.message.embeds[0])).catch(() => {
					client.channels.cache.get(ERROR)
						.send(`${user.toString()}, I could not DM you, please change your privacy settings and try again.`)
						.catch(() => {});
				});
			}
		});
	}
};