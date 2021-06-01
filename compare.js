const COMPARE_PRICE = 35;
const MULTIPLIER = 1.5;
const minimumWalmartPrice = 15;

let upcCache = require('./upcCache.js').array;

module.exports.run = function compare(walmart, ebay) {
	let ebayPrice = Number(ebay.sellingStatus[0].currentPrice[0].__value__);
	let walmartPrice = walmart.salePrice;

	if (walmartPrice > minimumWalmartPrice &&
		(ebayPrice - COMPARE_PRICE > walmartPrice || walmartPrice * MULTIPLIER < ebayPrice) &&
		(!upcCache.find((u) => u === walmart.upc))) {
		upcCache.push(walmart.upc);
		return true;
	}
	else {
		return false;
	}
};