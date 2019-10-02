const http = require('http');
const app = require('./app');
var SwaggerExpress = require('swagger-express-mw');
const checkAuth = require('./api/middleware/check-auth');

var config = {
    appRoot: __dirname, // required config
    swaggerSecurityHandlers: {
      BasicAuth: function (req, authOrSecDef, scopesOrApiKey, cb) {
  
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
  
            if (decoded.broker_id) {
              req.tokenData = decoded;
              cb(null);
            } else {
              cb(new Error('Auth failed')); 
            }
            
          } catch (error) {
            cb(new Error('Auth failed'));
         }
      },
      BrokerAuth: function (req, authOrSecDef, scopesOrApiKey, cb) {
        cb(null);
      }

    }
  };


  SwaggerExpress.create(config, async function(err, swaggerExpress) {

    if (err) {
      throw err; }
    // install middleware
    swaggerExpress.register(app);
    const port = process.env.PORT;
    //app.listen(port);

    const server = http.createServer(app);
    server.listen(port);
    const io = require('socket.io')(server);
    // require('./lib/socket')(io);

    console.log('API DOC: http://'+process.env.SWAGGER_URL + '/api-docs');
     
  });


