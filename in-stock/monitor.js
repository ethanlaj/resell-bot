let alert = require("./alert.js").run;
let checkStock = require("./checkStock.js").run;

module.exports.run = async function (client, item, page) {
	let stock = await checkStock(client, page);
	if (stock) {
		alert(client, item);
		return setTimeout(() => {
			module.exports.run(client, item, page);
		}, 600000);
	} else {
		return setTimeout(() => {
			module.exports.run(client, item, page);
		}, 30000);
	}
};