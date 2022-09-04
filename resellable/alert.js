const CATEGORIES = require("./categories").CATEGORIES;

let { MessageEmbed } = require("discord.js");

const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
function formatPrice(price) {
	return formatter.format(price);
}

let count = 1;

module.exports.run = function(client, walmart, ebay, categoryID) {
	let channel = CATEGORIES.find((i) => i.category === categoryID).channel;

	let ebayPrice = Number(ebay.sellingStatus[0].currentPrice[0].__value__);
	let walmartPrice = walmart.salePrice;

	let messageData = new MessageEmbed()
		.setTitle(walmart.name)
		.setThumbnail(walmart.largeImage)
		.addField("UPC", walmart.upc)
		.addField("Walmart Price", formatPrice(walmartPrice))
		.addField("Ebay Price", formatPrice(ebayPrice))
		.addField("Price Difference", formatPrice(ebayPrice - walmartPrice))
		.addField("Walmart Offer Type", walmart.offerType ? walmart.offerType : "IN_STORE_ONLY")
		.addField("Walmart Product Link", `https://www.walmart.com/ip/${walmart.itemId}`)
		.addField("Ebay Listing", ebay.viewItemURL)
		.setColor(walmart.offerType ? "GREEN" : "ORANGE")
		.setTimestamp()
		.setFooter("We are not financially responsible for decisions based on these alerts.");

	if (walmart.upc)
		messageData.setImage(`http://www.barcode-generator.org/zint/api.php?bc_number=34&bc_data=${walmart.upc.slice(0, 11)}`);

	console.log("Posted" + count++);
	client.channels.cache.get(channel).send(messageData).then((msg) => msg.react("⭐")).catch(() => {});

};