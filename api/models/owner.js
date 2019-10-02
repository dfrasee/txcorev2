const mongoose = require('mongoose');
const Broker = require('../models/broker');
const shortid = require('shortid');
shortid.characters(process.env.SHORTID_CHARACTERS);

const ownerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	shortid: { type: String, default: shortid.generate },
	broker: { type: mongoose.Schema.Types.ObjectId, ref: 'Broker', required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	passphrase_validate: { type: String, default: null }, // encrypted "true" with passphrase
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	paymentname: { type: String },
	country: String,
	mobile: String,
	language: {type: String, default: 'en' },
	external_id: String,
	verification_token: String,
	is_verified: { type: Number, default: 0 },
	forgot_random: {type: String, default: null },
	auto_withdraw: { type: Boolean, default: false },
	last_login: { type: Date, default: Date.now }

});

ownerSchema.index({ email: 1, broker: 1}, { unique: true });

module.exports = mongoose.model('Owner', ownerSchema);