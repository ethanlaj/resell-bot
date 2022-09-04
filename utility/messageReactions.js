const { EmbedBuilder } = require("discord.js");

const CATEGORY_ID = "848914366421401612";
const ERROR = "1016052786867212368";
const GET_ACCESS_ID = "849357403338178600";
const FREE_TRIAL_ROLE = "849820964766089269";

module.exports.run = async function (client) {
	client.on("messageReactionAdd", async (messageReaction, user) => {
		let error = false;
		if (messageReaction.partial)
			await messageReaction.fetch().catch((e) => { console.log(e); error = true;});

		if (error)
			return;

		if (messageReaction.message.channel.parentId === CATEGORY_ID
					&& messageReaction.emoji.name === "⭐"
					&& user.id !== "848696353148108800"
					&& messageReaction.message.embeds[0]) {

			let embed = messageReaction.message.embeds[0];
			user.send({ content: embed.fields[0].value, embeds: [EmbedBuilder.from(messageReaction.message.embeds[0])] }).catch(() => {
				client.channels.cache.get(ERROR)
					.send(`${user.toString()}, I could not DM you, please change your privacy settings and try again.`)
					.catch(() => {});
			});
		}

		// Get access now channel
		if (messageReaction.message.channelId === GET_ACCESS_ID
			&& messageReaction.emoji.name === "🔥"
			&& user.id !== "848696353148108800"
			&& messageReaction.message.embeds[0]) {
			
			// Adds fire emoji back if missing
			if (!messageReaction.me)
				messageReaction.react("🔥");

			let guild = messageReaction.message.guild;
			guild.members.fetch(user.id).then((member) => {
				member.roles.add(FREE_TRIAL_ROLE).catch(() => {});
			}).catch(() => {});
			
			await messageReaction.users.remove(user.id).catch(() => {});
		}

	});
};