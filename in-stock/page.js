
module.exports = {
	run: async function (browser, url) {
		let page = await browser.newPage();
		page = await this.random(page);
		await page.goto(url);

		return page;
	},
	random: async function (page) {
		await page.setViewport({
			width: 1920 + Math.floor(Math.random() * 100),
			height: 3000 + Math.floor(Math.random() * 100),
			deviceScaleFactor: 1,
			hasTouch: false,
			isLandscape: false,
			isMobile: false,
		});

		await page.setJavaScriptEnabled(true);
		await page.setDefaultNavigationTimeout(0);

		return page;
	}
};