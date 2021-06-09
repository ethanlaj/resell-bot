let alert = require('./alert.js').run;
let checkStock = require('./checkStock.js').run;

module.exports.run = async function (client, item, page) {
	let stock = await checkStock(page);
	if (stock) {
		alert(client, item);
		return setTimeout(() => {
			this.run(client, item, page);
		}, 600000);
	} else {
		return setTimeout(() => {
			this.run(client, item, page);
		}, 30000);
	}
};