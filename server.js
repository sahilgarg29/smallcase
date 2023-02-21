const app = require('./app');
const connect = require('./configs/db');

const PORT = process.env.PORT || 5001;

app.listen(PORT, async function () {
	try {
		await connect();
		console.log('listening on port 2345');
	} catch (err) {
		console.log(err);
	}
});
