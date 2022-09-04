let items = require("./items.js");
const ITEMS = items.items;

let initBrowser = require("./initBrowser.js").run,
	initPage = require("./page.js"),
	monitor = require("./monitor.js").run;

module.exports.run = async function (client) {
	let browser = await initBrowser();

	for (let item of ITEMS) {
		let page = await initPage.run(browser, item.url);
		monitor(client, item, page);
	}
};

