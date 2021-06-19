let findListings = require('./resellable/findListings.js').run,
	compare = require('./resellable/compare.js').run,
	searchUPC = require('./resellable/searchUPC.js').run,
	getUPC = require('./resellable/getUPC.js').run,
	alert = require('./resellable/alert.js').run,
	//database = require('./utility/database.js'),
	//trials = require('./utility/trials.js').run,
	updateMessages = require('./utility/updateMessages.js').run,
	getProductInfo = require('./employees/getProductInfo.js').listen,
	favorite = require('./utility/favorite.js');

const { Client } = require('discord.js');
const { CATEGORIES } = require('./resellable/categories.js');
const client = new Client();
client.login(process.env.BOT_TOKEN);

client.on('ready', async () => {
	console.log('Successfully started application.');

	await favorite.fetchMessages(client);
	favorite.run(client);

	updateMessages(client);
	getProductInfo(client);

	//await database.initiate();
	//trials(client);

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
