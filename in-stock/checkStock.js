const puppeteer = require('puppeteer');


let RegExp = /schema.org\/[a-zA-Z]+/;
//let count = 1;

module.exports.run = async function (url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
	await page.goto(url);
	await page.screenshot({ path: 'example.png' });

	await browser.close();

	/*if (!res)
		return false;

	let text = await res.text();
	//text = text.replace(/\s/g, '');

	console.log(text);
	if (RegExp.test(text))
		return RegExp.exec(text)[0];
	else
		return false;*/
};