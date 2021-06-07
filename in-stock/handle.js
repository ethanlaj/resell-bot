let items = require('./items.js');
const ITEMS = items.items;
const CHANNELS = items.channels;

let checkStock = require('./checkStock.js').run;

module.exports.run = async function (client) {
	for (let item of ITEMS) {
		//setInterval(async () => {
		await checkStock(item.url);
		/*if (result)
			console.log(result);
		let channel_id = CHANNELS.find((i) => i.key === item.key).channel;
					let channel = client.channels.cache.get(channel_id);
					if (channel)
					{
						channel.send(`Back in stock: https://www.walmart.com/ip/${result.itemId}`);
					}*/
		//}, 30000);
	}
};

