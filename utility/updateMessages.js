const { MessageEmbed } = require("discord.js");

const MESSAGES = [
	{ channel_id: "849310422720446484", message_id: "850241195393024001", orignal_id: "850231255185358878" },
	{ channel_id: "849357403338178600", message_id: "850241193915711488", orignal_id: "850233138369658880" },
	{ channel_id: "849528007936835585", message_id: "850241193727754272", orignal_id: "850242888243085332" }
];

const ORIGINALS = "850231111324794880";

module.exports.run = async function (client) {
	// get messages in bot-fetch channel
	let orignals = client.channels.cache.get(ORIGINALS);
	if (!orignals)
		return;

	let original_messages = await orignals.messages.fetch().catch(() => {});
	if (!original_messages)
		return;

	// loop through each message
	for (let message of MESSAGES) {
		let channel = client.channels.cache.get(message.channel_id);
		if (!channel)
			return;

		let channel_messages = await channel.messages.fetch().catch(() => {});
		if (!channel_messages)
			return;

		let channel_message = channel_messages.get(message.message_id);
		let original_message = original_messages.get(message.orignal_id);

		if (!channel_message || !original_message)
			return;

		let split_contents = original_message.content.split("\n");
		channel_message.edit(new MessageEmbed()
			.setTitle(split_contents[0])
			.setDescription(split_contents.splice(1).join("\n"))
		);
	}
};