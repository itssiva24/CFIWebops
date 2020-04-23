const express = require('express');
const newRouter = express.Router();
const User = require('../models/index');
const SignUpUser = require('../models/UserSignup');
const UserSession = require('../models/UserSession');

newRouter.post('/signup', (req, res) => {
	const { body } = req;
	const { password } = body;
	let { email } = body;

	if (!email) {
		return res.send({
			success: false,
			message: 'Error: Email cannot be blank'
		});
	}
	if (!password) {
		return res.send({
			success: false,
			message: 'Error: Password cannot be blank'
		});
	}
	email = email.toLowerCase();

	//Verifying the email doesn't exist
	SignUpUser.find({ email: email }, (err, existingUsers) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Server Error'
			});
		} else if (existingUsers.length > 0) {
			return res.send({
				success: false,
				message: 'Account already exists'
			});
		}
		const newUser = new SignUpUser();
		newUser.email = email;
		newUser.password = password;
		newUser.save((err, user) => {
			if (err) {
				return res.send({
					success: false,
					message: 'Error: Server error'
				});
			} else {
				return res.send({
					success: true,
					message: 'Signed up'
				});
			}
		});
	});

	//Saving the user
});
newRouter.post('/signin', (req, res, next) => {
	const { body } = req;
	const { password } = body;
	let { email } = body;
	if (!email) {
		return res.send({
			success: false,
			message: 'Error: Email cannot be blank.'
		});
	}
	if (!password) {
		return res.send({
			success: false,
			message: 'Error: Password cannot be blank.'
		});
	}
	email = email.toLowerCase();
	email = email.trim();
	User.find(
		{
			email: email
		},
		(err, users) => {
			if (err) {
				console.log('err 2:', err);
				return res.send({
					success: false,
					message: 'Error: server error'
				});
			}
			if (users.length != 1) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			}
			const user = users[0];
			if (!user.validPassword(password)) {
				return res.send({
					success: false,
					message: 'Error: Invalid'
				});
			}
			// Otherwise correct user
			const userSession = new UserSession();
			userSession.userId = user._id;
			userSession.save((err, doc) => {
				if (err) {
					console.log(err);
					return res.send({
						success: false,
						message: 'Error: server error'
					});
				}
				return res.send({
					success: true,
					message: 'Valid sign in',
					token: doc._id
				});
			});
		}
	);
});

module.exports = newRouter;
