const randomUserAgent = require('random-useragent');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

module.exports.run = async function (url) {
	let options = {
		headless: true,
		args: ['--no-sandbox']
	};
	if (process.env.ENVIRONMENT === 'local') {
		options.executablePath = './node_modules/puppeteer/.local-chromium/mac-884014/chrome-mac/Chromium.app/Contents/MacOS/Chromium';
	}
	let browser = await puppeteer.launch(options);

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
};