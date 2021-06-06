let findListings = require('./findListings.js').run,
	compare = require('./compare.js').run,
	searchUPC = require('./searchUPC.js').run,
	getUPC = require('./getUPC.js').run,
	alert = require('./alert.js').run,
	database = require('./database.js'),
	trials = require('./trials.js').run,
	updateMessages = require('./updateMessages.js').run,
	getProductInfo = require('./getProductInfo').listen;

const { Client } = require('discord.js');
const { CATEGORIES } = require('./categories.js');
const client = new Client();
client.login(process.env.BOT_TOKEN);

client.on('ready', async () => {
	console.log('Successfully started application.');

	getProductInfo(client);

	updateMessages(client);

	await database.initiate();
	trials(client);

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
	console.log('Done');
	console.log('Re-initiate:');
	initiate();
}
