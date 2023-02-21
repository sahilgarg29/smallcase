const mongoose = require('mongoose');

module.exports = () => {
	return mongoose.connect(
		`mongodb+srv://sahil29:sahil.com@cluster0.e1kfd.mongodb.net/smallcase?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			// useFindAndModify: false,
			useUnifiedTopology: true,
		}
	);
};
