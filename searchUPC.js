let walmart = require('walmartio-js').function;

const url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items';
const method = 'GET';

const cb = (res) => {
	return res;
};

module.exports.run = async function searchUPC(UPC, secondTry = false) {
	if (UPC.length < 12)
		return false;

	let originalUPC = UPC;

	if (UPC.length > 12)
		if (secondTry)
			UPC = UPC.substring(0, 12);
		else
			UPC = UPC.substring(UPC.length - 12);

	let query = `upc=${UPC}`;

	let res = await walmart(cb, url, method, null, query ).catch((e) => console.log(e));
	if (res && res.items && res.items[0].itemId) {
		return res.items[0];
	}
	else if (secondTry)
		return false;
	else
		return searchUPC(originalUPC, true);
};