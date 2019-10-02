const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
const ownerRoutes = require('./api/routes/owner');


const dbOptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false, // just to remove DeprecationWarning: collection.findAndModify is deprecated
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose.connect(process.env.MONGOOSE_CONNECTION_STR, dbOptions);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use((error, req, res, next) => {
	if (!error) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === 'OPTOINS') {
			res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
			return res.status(200).json({});
		}
		next();
	} else {
		console.error(error);
    	res.send(500);
	}
});

// Routes which should handle requests
app.use('/owner', ownerRoutes);

var options = {
	customCss: '.swagger-ui .download-contents { display: none } .tg  {border-collapse:collapse;border-spacing:0;border-color:#999;}.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#999;color:#444;background-color:#F7FDFA;}.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#999;color:#fff;background-color:#26ADE4;}.tg .tg-0lax{text-align:left;vertical-align:top;padding-left: 10px !important;}'
};

swaggerDocument.host = process.env.SWAGGER_URL;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	error.code = 11;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		status: 'nok',
		code: error.code,
		message: error.message
	});
});


module.exports = app;