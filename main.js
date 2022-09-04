let findListings = require("./resellable/findListings.js").run,
	compare = require("./resellable/compare.js").run,
	searchUPC = require("./resellable/searchUPC.js").run,
	getUPC = require("./resellable/getUPC.js").run,
	alert = require("./resellable/alert.js").run,
	updateMessages = require("./utility/updateMessages.js").run,
	messageReactions = require("./utility/messageReactions.js");

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { CATEGORIES } = require("./resellable/categories.js");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent],
	partials: [Partials.Message, Partials.Reaction],
});

client.login(process.env.BOT_TOKEN);

client.on("ready", async () => {
	console.log("Successfully started application.");

	messageReactions.run(client);
	updateMessages(client);

	initiate();
});

async function initiate () {
	for (let i = 0; i < CATEGORIES.length; i++) {
		let category = CATEGORIES[i].category;

		let data = await findListings(category);
		for (let i = 0; i < data.length; i++) {
			let ebayProduct = data[i];

			let productUPC = await getUPC(ebayProduct);
			if (productUPC) {
				let walmartProduct = await searchUPC(productUPC);
				if (walmartProduct)
					if (compare(walmartProduct, ebayProduct))
						alert(client, walmartProduct, ebayProduct, category);
			}
		}
	}
	console.log("Done");
	console.log("Re-initiate:");
	initiate();
}
