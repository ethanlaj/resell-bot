let items = require('./items.js');
const ITEMS = items.items;
const CHANNELS = items.channels;

let initBrowser = require('./initBrowser.js').run;

let RegExp = /<link itemprop="availability" href="\/\/schema.org\/[a-zA-Z]+/;


async function checkStock(page) {
	await page.reload();

	/* eslint-disable-next-line no-undef */
	let content = await page.evaluate(() => document.body.innerHTML);
	if (RegExp.test(content)) {
		return RegExp.exec(content)[0].split('schema.org/')[1] === 'InStock';
	} else
		return false;
}

async function monitor(client, item, page) {
	let stock = await checkStock(page);
	if (stock) {
		let channel_id = CHANNELS.find((c) => c.key === item.key).channel;
		client.channels.cache.get(channel_id).send(`@everyone ${item.url}`);
		return setTimeout(() => {
			monitor(client, item, page);
		}, 600000);
	} else {
		return setTimeout(() => {
			monitor(client, item, page);
		}, 30000);
	}
}

module.exports.run = async function (client) {
	for (let item of ITEMS) {
		let page = await initBrowser(item.url);
		monitor(client, item, page);
	}
};

