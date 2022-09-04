const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
	RecaptchaPlugin({
		provider: {
			id: "2captcha",
			token: process.env.TWOCAP,
		},
		visualFeedback: false
	})
);

module.exports.run = async function () {
	let options = {
		headless: true,
		args: ["--no-sandbox"]
	};
	if (process.env.ENVIRONMENT === "local") {
		options.executablePath = "./node_modules/puppeteer/.local-chromium/mac-884014/chrome-mac/Chromium.app/Contents/MacOS/Chromium";
	}
	let browser = await puppeteer.launch(options);

	return browser;
};