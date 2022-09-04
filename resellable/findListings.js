const EBAY = require("ebay-node-api");


let ebay = new EBAY({
	clientID: process.env.EBAY,
});

module.exports.run = async function (category) {
	let data = await ebay.findItemsByCategory({
		categoryId: category,
		//limit: 10,
		Condition: 1000,
		sortOrder: "StartTimeNewest"
	}).catch((e) => console.log(e));
	/*let data = await ebay.findItemsByKeywords({
		keywords: 'chlorine',
		Condition: 1000,
	});*/
	return data[0].searchResult[0].item;
};