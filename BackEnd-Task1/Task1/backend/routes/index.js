const express = require('express');
const router = express.Router();
const User = require('../models/index');

//Handling a get request for the route '/'
router.get('/', (req, res) => {
	User.find({}, (err, data) => {
		res.json(data);
	});
});
//Handling a get request for the route '/:id'
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, data) => {
		res.json(data);
	});
});
//Handling a post request for the route '/'
router.post('/', (req, res) => {
	user = new User({
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password,
		gender: req.body.gender,
		hobbies: req.body.hobbies
	});

	user.save(() => {
		res.json(user);
	});
});

//Exporting router
module.exports = router;
