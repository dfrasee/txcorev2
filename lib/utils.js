const crypto = require('crypto'); //https://lollyrock.com/articles/nodejs-encryption
const bcrypt = require('bcrypt');
const faker = require('faker');
const mongoose = require('mongoose');
const AssetController = require('../api/controllers/asset');
const OrderController = require('../api/controllers/order');
const TradeController = require('../api/controllers/trade');
const TxtokenController = require('../api/controllers/txtoken');
const TxledgerController = require('../api/controllers/txledger');
const TxledgerDBController = require('../api/controllers/txledgerdb');
const Pulse = require('../api/models/pulse');
const Owner = require('../api/models/owner');
const OwnerAsset = require('../api/models/owner-asset');
const Ticker = require('../api/models/ticker');
const TickerAvailable = require('../api/models/ticker-available');
const Broker = require('../api/models/broker');
const Asset = require('../api/models/asset');
const BlockTransaction = require('../api/models/block-transaction');
const BrokerAsset = require('../api/models/broker-asset');
const Trade = require('../api/models/trade');
const Counter = require('../api/models/counter');
const OrderDepth = require('../api/models/order-depth');
const Order = require('../api/models/order-book');
const FeeTemplate = require('../api/models/fee-template');
const MarketPool = require('../api/models/market-pool');
const PostLog = require('../api/models/post-log');
const RequestErrorLog = require('../api/models/request-error-log');

const WithdrawFeeTemplate = require('../api/models/withdraw-fee-template');
const PaymentFeeTemplate = require('../api/models/payment-fee-template');
const Withdraw = require('../api/models/withdraw');
const Payout = require('../api/models/payout');
const Payment = require('../api/models/payment');



const moment = require('moment');
const math = require('mathjs');
const utils = require('../lib/utils');


const orderStatus = {
    'PENDING': '1',
    'OPEN': '2',
    'PARTIAL': '3', // open but not filled
    'FILLED': '4', // all of order sold/bought (same as complete)
    'SUSPENDED': '5', // if not enough credit
    'CANCELLED': '6',
    'FAILED': '7'
};
exports.order_status = orderStatus;


exports.some_function = async function(){
	console.log('utils.some_function')
}