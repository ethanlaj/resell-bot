const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const randomUserAgent = require('random-useragent');

let RegExp = /<link itemprop="availability" href="\/\/schema.org\/[a-zA-Z]+/;
let url = 'https://www.walmart.com/ip/HTH-Super-3-inch-Chlorine-Tablets-for-Pool-5-Pounds/169044841';

async function initBrowser() {
	let browser = await puppeteer.launch({ headless: true }); //executablePath: './node_modules/puppeteer/.local-chromium/mac-884014/chrome-mac/Chromium.app/Contents/MacOS/Chromium',

	let page = await browser.newPage();

	const userAgent = randomUserAgent.getRandom();
	const UA = userAgent;

	await page.setViewport({
		width: 1920 + Math.floor(Math.random() * 100),
		height: 3000 + Math.floor(Math.random() * 100),
		deviceScaleFactor: 1,
		hasTouch: false,
		isLandscape: false,
		isMobile: false,
	});

	await page.setUserAgent(UA);
	await page.setJavaScriptEnabled(true);
	await page.setDefaultNavigationTimeout(0);


	await page.goto(url);
	return page;
}

async function checkStock(page) {
	await page.reload();

	/* eslint-disable-next-line no-undef */
	let content = await page.evaluate(() => document.body.innerHTML);
	//console.log(content);
	if (RegExp.test(content)) {
		console.log(RegExp.exec(content)[0].split('schema.org/')[1]);
	}
}

async function monitor() {
	let page = await initBrowser();
	console.log(page);
	await checkStock(page);
}

module.exports.run = async function () {
	monitor();
};