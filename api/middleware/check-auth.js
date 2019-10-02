const jwt = require('jsonwebtoken');
const Broker = require('../models/broker');
// const isIpRestrict = (process.env.ENABLE_IP_RESTRICTION === 'true');

exports.broker = async (req, res, next) => {
	next();
};

// exports.broker = async (req, res, next) => {

// 	try {
// 		const token = req.headers.authorization.split(" ")[1];
// 		const decoded = jwt.verify(token, process.env.JWT_KEY);

// 		if (decoded.broker_id) {

// 			// if IP restrict enabled
// 			if (isIpRestrict) {
// 				const broker = await Broker.findById(decoded.broker_id);

// 				if (broker) {
// 					// console.log(req.headers['x-forwarded-for']);
// 					// console.log(req.headers['x-real-ip']);
// 					const current_ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
// 					// console.log('Request IP: ' + current_ip);

// 					const ips = broker.ip_restrict.split(",");

// 					if (ips.includes(current_ip)) {
// 						// if IP valid
// 						req.tokenData = decoded;
// 						next();
// 					} else {
// 						return res.status(403).json({
// 							code: 14,
// 							messsage: 'Forbidden: IP address rejected'
// 						});
// 					}
// 				} else {
// 					return res.status(401).json({
// 						code: 13,
// 						messsage: 'Auth failed'
// 					});
// 				}

// 			} else {
// 				req.tokenData = decoded;
// 				next();
// 			}

// 		} else {
// 			return res.status(401).json({
// 				code: 12,
// 				messsage: 'Auth failed'
// 			});
// 		}
// 	} catch (error) {
// 		console.log(error.message);
// 		return res.status(401).json({
// 			code: 10,
// 			messsage: 'Auth failed'
// 		});
// 	}
// };
