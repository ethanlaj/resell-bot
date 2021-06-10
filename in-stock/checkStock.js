let initPage = require('./page.js').random;

let RegExp = /<link itemprop="availability" href="\/\/schema.org\/[a-zA-Z]+/;

const ERROR_CHANNEL = '851471341278462003';

module.exports.run = async function (client, page) {
	module.exports.client = client;
	page = await initPage(page);
	await page.reload();

	/* eslint-disable-next-line no-undef */
	let content = await page.evaluate(() => document.body.innerHTML);
	if (content.includes('g-recaptcha')) {
		sendToChannel('Starting to solve captcha at `' + new Date(Date.now()) + '`');
		await page.solveRecaptchas()
			.then(() => sendToChannel('Solved a captcha at `' + new Date(Date.now()) + '`'))
			.catch((e) => sendToChannel('@everyone\n' + e + ' at `' + new Date(Date.now()) + '`'));

		try {
			await Promise.all([
				page.waitForNavigation(),
				page.click('#sign-in-widget')
			]);
		}
		catch (err) {
			sendToChannel(err + ' at `' + new Date(Date.now()) + '`');
		}

		sendToChannel('End of captcha solving script at`' + new Date(Date.now()) + '`');
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
};

function sendToChannel(msg) {
	let channel = module.exports.client.channels.cache.get(ERROR_CHANNEL);
	channel.send(msg).catch(() => {});
}