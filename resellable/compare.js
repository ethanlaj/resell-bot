const COMPARE_PRICE = 35;
const MULTIPLIER = 1.5;
const minimumWalmartPrice = 15;

/*For faster debugging
const COMPARE_PRICE = 0;
const MULTIPLIER = 0.1;
const minimumWalmartPrice = 0;*/

let upcCache = require("./upcCache.js").array;

module.exports.run = function compare(walmart, ebay) {
	let ebayPrice = Number(ebay.sellingStatus[0].currentPrice[0].__value__);
	let walmartPrice = walmart.salePrice;

	if (walmartPrice > minimumWalmartPrice &&
		(ebayPrice - COMPARE_PRICE > walmartPrice || walmartPrice * MULTIPLIER < ebayPrice) &&
		!walmart.marketplace &&
		(!walmart.offerType || walmart.offerType === "ONLINE_AND_STORE") &&
		(!upcCache.find((u) => u === walmart.upc))) {
		upcCache.push(walmart.upc);
		return true;
	}
	else {
		return false;
	}
};