const mongoose = require('mongoose');
const Owner = require('../models/owner');
const uuid = require("uuid");
const moment = require('moment');

exports.get_owner_by_email_post = async (req, res, next) => {

	const email = req.body.e;
	// validattion
	req.checkBody('e', 'e=Email must be email format').isEmail();
	req.checkBody('e', 'e=Email is required').notEmpty();

	console.log('email: ', email)

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json({message: 'Could not create ownerxxx', code: 100, error: errors.map(a => a.msg).join(', '), status: 'nok'});
		return false;
	}

	try {
		const owner = await Owner.findOne({ email: email });
		if (owner) {
			res.status(201).json({
				owner: owner,
				status: 'ok',
				message: 'Owner was created'
			});
		} else {
			res.status(400).json({
				status: 'nok',
				message: 'Email not exist'
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({error: err, code: 10, status: 'nok'});
	}
}

exports.get_owner_by_email_get = async (req, res, next) => {

	// get data
	const owner_email = req.query.e;

	// validattion
	req.checkQuery('e', 'e=email is required').notEmpty();
	req.checkQuery('e', 'e=email is not valid').isEmail();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json({message: 'Could not get owner', code: 100, error: errors.map(a => a.msg).join(', '), status: 'nok'});
		return false;
	}

	try {

		let query = { email: { $regex: owner_email, $options: 'i' } };
		const owners = await Owner.find(query);

		if (owners.length > 0) {
			res.status(200).json({ status: "ok", owners: owners, message: "Owner found" });
		} else {
			res.status(200).json({ status: "ok", onwers: null, message: "Owner not found" });
		}

	} catch (err) {
		console.error(err);
		res.status(500).json({error: err, code: 10, status: 'nok'});
	}
}

exports.get_owner_by_email_with_path = async (req, res, next) => {
	// get data
	const owner_email = req.params.email;

	// validattion
	req.checkParams('email', 'email is required').notEmpty();
	req.checkParams('email', 'email is not valid').isEmail();

	var errors = req.validationErrors();
	if (errors) {
		res.status(400).json({message: 'Could not get owner', code: 100, error: errors.map(a => a.msg).join(', '), status: 'nok'});
		return false;
	}

	try {

		let query = { email: { $regex: owner_email, $options: 'i' } };
		const owners = await Owner.find(query);
		if (owners.length > 0) {
			res.status(200).json({ status: "ok", owners: owners, message: "Owner found" });
		} else {
			res.status(200).json({ status: "ok", onwers: null, message: "Owner not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({error: err, code: 10, status: 'nok'});
	}
};