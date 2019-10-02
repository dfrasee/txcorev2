const mongoose = require('mongoose');
const shortid = require('shortid');
shortid.characters(process.env.SHORTID_CHARACTERS);

const brokerSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	shortid: { type: String, default: shortid.generate },
	name: { type: String },
	api_id: { type: String, required: true },
	api_secret: { type: String, required: true },
	processor: { type: Number, default: 1, required: true }, // 1=ledgerdb, 2=txledger
	broker_type: { type: Number, default: 2, required: true }, // 1=txcore, 2=other
	postback_url: { type: String },
	trade_postback_url: { type: String },
	asset_postback_url: { type: String },
	brokerasset_postback_url: { type: String },
	brokerticker_postback_url: { type: String },
	passphrase_validate: { type: String },
	ip_restrict: { type: String },
	freemarket: { type: Boolean, default: true },
	allow_payment: { type: Boolean, default: false },
	auto_withdraw: { type: Boolean, default: false },
	timezone: { type: String },
});

module.exports = mongoose.model('Broker', brokerSchema);