let { MessageEmbed, MessageAttachment } = require('discord.js');
let items = require('./items.js');
const CHANNELS = items.channels;

const attachment = new MessageAttachment('./inStock.png', 'inStock.png');

module.exports.run = function(client, item) {
	let split = item.url.split('/');
	let title = split[4].replace(new RegExp('-', 'g'), ' ');
	let url = item.url;
	let addToCartUrl = `https://affil.walmart.com/cart/buynow?items=${split[5]}`;

	let channel = CHANNELS.find((i) => i.key === item.key).channel;
	channel = client.channels.cache.get(channel);

	let messageData = new MessageEmbed()
		.setTitle('Restock Notification:')
		.setDescription(title)
		.addField('URL', url)
		.addField('Add to Cart URL', addToCartUrl)
		.setColor('BLUE')
		.attachFiles(attachment)
		.setImage('attachment://inStock.png')
		.setTimestamp()
		.setFooter('We are not financially responsible for decisions based on these alerts.');

	channel.send('@everyone', { embed: messageData });
};

