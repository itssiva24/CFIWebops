const mongoose = require('mongoose');
const Schema = mongoose.Schema;

newSchema = new Schema({
	email: String,
	password: String
});

module.exports = mongoose.model('SignUpUser', newSchema);
