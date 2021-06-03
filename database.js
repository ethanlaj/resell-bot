const { Client } = require('pg');
let client = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }});

const TRIAL_LENGTH = 604800000;

module.exports = {
	allTrials: [],
	client,
	getAllTrials: function () {
		return client.query('SELECT user_id, expiration FROM public.trials');
	},
	startTrial: function (user_id) {
		let expiration = Date.now() + TRIAL_LENGTH;
		return client.query('INSERT INTO public.trials (user_id, expiration) VALUES ($1, $2)', [user_id, expiration])
			.then(() => module.exports.allTrials.push({ user_id, expiration }));
	},
	initiate: async function () {
		await client.connect().catch((e) => console.log(e));
		let trials = await this.getAllTrials().then((r) => r.rows);
		this.allTrials = trials;

		return;
	}
};