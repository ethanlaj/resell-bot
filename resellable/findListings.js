const EBAY = require("ebay-node-api");


let ebay = new EBAY({
	clientID: process.env.EBAY,
});

module.exports.run = async function (category) {
	let data = await ebay.findItemsByCategory({
		categoryId: category,
		Condition: 1000,
		sortOrder: "StartTimeNewest",
		//SoldItemsOnly: true,
	}).catch(() => {});
	/*let data = await ebay.findCompletedItems({
		//keywords: "chlorine",
		categoryId: category,
		limit: 10,
		SoldItemsOnly: true,
		Condition: 1000,
	});*/
	return data[0].searchResult[0].item;
};