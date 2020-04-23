const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

newSchema = new Schema({
	fullName: String,
	email: String,
	password: String,
	gender: String,
	hobbies: String
});
newSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
module.exports = mongoose.model('User', newSchema, 'users');
