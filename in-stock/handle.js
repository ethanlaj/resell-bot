let items = require('./items.js');
const ITEMS = items.items;

let initBrowser = require('./initBrowser.js').run;
let initPage = require('./page.js');
let alert = require('./alert.js').run;

let RegExp = /<link itemprop="availability" href="\/\/schema.org\/[a-zA-Z]+/;

const ERROR_CHANNEL = '851471341278462003';

function sendToChannel(msg) {
	let channel = module.exports.client.channels.cache.get(ERROR_CHANNEL);
	channel.send(msg).catch(() => {});
}

async function checkStock(page) {
	page = await initPage.random(page);
	await page.reload();

	/* eslint-disable-next-line no-undef */
	let content = await page.evaluate(() => document.body.innerHTML);
	if (content.includes('g-recaptcha')) {
		sendToChannel('Starting to solve captcha at `' + new Date(Date.now()) + '`');
		await page.solveRecaptchas()
		.then(() => sendToChannel('Solved a captcha at `' + new Date(Date.now()) + '`')
		.catch((e) => sendToChannel('@everyone\n' + e + ' at `' + new Date(Date.now()) + '`');
)
)

		/*var waitForNavigation = new Promise(async (resolve) => {
			await page.waitForNavigation().catch((e) => sendToChannel(e + ' at `' + new Date(Date.now()) + '`'));
			resolve();
		});
		var click = new Promise(async (resolve) => {
			await page.click('#sign-in-widget').catch((e) => sendToChannel(e + ' at `' + new Date(Date.now()) + '`'));
			resolve();
		});

		await Promise.all([ waitForNavigation, click ]).catch(() => {});*/

		try {
			await Promise.all([
				page.waitForNavigation(),
				page.click('#sign-in-widget')
			]);
		}
		catch (err) {
			sendToChannel(err + ' at `' + new Date(Date.now()) + '`');
		}

		sendToChannel('Solved a captcha at `' + new Date(Date.now()) + '`');
	}

	/* eslint-disable-next-line no-undef */
	content = await page.evaluate(() => document.body.innerHTML);

	if (RegExp.test(content)) {
		sendToChannel(RegExp.exec(content)[0].split('schema.org/')[1] + ' at `' + new Date(Date.now()) + '`');
		return RegExp.exec(content)[0].split('schema.org/')[1] === 'InStock';
	} else if (content.includes('g-recaptcha')) {
		sendToChannel('Ran into a captcha, even after recaptcha script was ran at `' + new Date(Date.now()) + '`');
		return false;
	} else
		return false;
}

async function monitor(client, item, page) {
	let stock = await checkStock(page);
	if (stock) {
		/*let channel_id = CHANNELS.find((c) => c.key === item.key).channel;
		client.channels.cache.get(channel_id).send(`@everyone ${item.url}`);*/
		alert(client, item);
		return setTimeout(() => {
			monitor(client, item, page);
		}, 30000);
	} else {
		return setTimeout(() => {
			monitor(client, item, page);
		}, 15000);
	}
}

module.exports.run = async function (client) {
	module.exports.client = client;

	for (let item of ITEMS) {
		let browser = await initBrowser();

		let page = await initPage.run(browser, item.url);
		monitor(client, item, page);
	}
};

