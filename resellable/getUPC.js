const rp = require('request-promise');
const cheerio = require('cheerio');

function transform (body) {
	return cheerio.load(body);
}

let RegExp = /UPC:[0-9]{12,15}/;
let count = 1;

module.exports.run = async function (ebayProduct) {
	console.log('Still running...' + count++);

	let url = ebayProduct.viewItemURL[0];
	let res = await rp({ url, transform }).catch((e) => console.log(e));
	if (!res)
		return false;

	let text = res.text().replace(/\s/g, '');
	if (RegExp.test(text))
		return RegExp.exec(text)[0].split(':')[1];
	else
		return false;
};