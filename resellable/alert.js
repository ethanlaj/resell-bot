const CATEGORIES = require("./categories").CATEGORIES;

let { EmbedBuilder } = require("discord.js");

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
function formatPrice(price) {
	return formatter.format(price);
}

let count = 0;

module.exports.run = function(client, walmart, ebay, categoryID) {
	let channel = CATEGORIES.find((i) => i.category === categoryID).channel;

	let ebayPrice = Number(ebay.sellingStatus[0].currentPrice[0].__value__);
	let walmartPrice = walmart.salePrice;

	let messageData = new EmbedBuilder()
		.setTitle(walmart.name)
		.setThumbnail(walmart.largeImage)
		.addFields ([
			{ name: "UPC", value: walmart.upc },
			{ name: "Walmart Price", value: formatPrice(walmartPrice) },
			{ name: "Ebay Price", value: formatPrice(ebayPrice) },
			{ name: "Price Difference", value: formatPrice(ebayPrice - walmartPrice) },
			{ name: "Walmart Offer Type", value: (walmart.offerType ? walmart.offerType : "IN_STORE_ONLY") },
			{ name: "Walmart Product Link", value: `https://www.walmart.com/ip/${walmart.itemId}` },
			{ name: "Ebay Listing", value: ebay.viewItemURL[0] },
		])
		// First is green, second is orange. Green color is for products that are sold both online and in store at Walmart.
		.setColor(walmart.offerType ? [101, 201, 121] : [216, 131, 59])
		.setTimestamp()
		.setFooter({ text: "We are not financially responsible for decisions based on these alerts." });

	if (walmart.upc)
		messageData.setImage(`http://www.barcode-generator.org/zint/api.php?bc_number=34&bc_data=${walmart.upc.slice(0, 11)}`);

	client.channels.cache.get(channel).send({ content: walmart.upc, embeds: [messageData] })
		.then(async (msg) => { 
			await msg.react("👍").catch(() => {});
			await msg.react("👎").catch(() => {});
			await msg.react("⭐").catch(() => {});
		}).catch(() => {});
	console.log("Posted " + ++count);
};