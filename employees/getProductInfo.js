const { MessageEmbed } = require("discord.js");

const CHANNEL = "850938585351061514";
const ROLE = "850938793871015996";

let walmart = require("walmartio-js").function;

const url = "https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items";
const method = "GET";

const cb = (res) => {
	return res;
};

let RegExp = /[0-9]{5,12}/;

module.exports = {
	run: async function (walmartID) {
		let query = `ids=${walmartID}`;

		return await walmart(cb, url, method, null, query ).catch((e) => console.log(e));
	},
	listen: function (client) {
		client.on("message", async (message) => {
			if (message.channel.id === CHANNEL && message.member.roles.cache.get(ROLE)) {
				if (RegExp.test(message.content)) {
					let result = await module.exports.run(RegExp.exec(message.content)[0]);
					if (result) {
						if (result.error || result.errors)
							return message.channel.send("Product not found.");

						result = result.items[0];
						let embed = new MessageEmbed()
							.setTitle(result.name)
							.setColor("BLUE")
							.addField("Item ID", result.itemId || "Unknown")
							.addField("UPC", result.upc || "Unknown")
							.addField("Model Number", result.modelNumber || "Unknown")
							.addField("MSRP", result.msrp || "Unknown")
							.addField("Sale Price", result.salePrice || "Unknown")
							.addField("Clearance", result.clearance || "Unknown")
							.addField("Offer Type", result.offerType || "Unknown")
							.setThumbnail(result.thumbnailImage);

						if (result.upc)
							embed.setImage(`http://www.barcode-generator.org/zint/api.php?bc_number=34&bc_data=${result.upc.slice(0, 11)}`);
						if (result.size)
							embed.addField("Size", result.size);
						if (result.color)
							embed.addField("Color", result.color);

						message.channel.send(embed);
					} else {
						message.channel.send("Product not found.");
					}
				}
			}
		});
	}
};