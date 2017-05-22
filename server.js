// =================================================================
// get the packages we need ========================================
// =================================================================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config      = require('./app/config'); // get our config file
var cors        = require('cors');
var registerRoutes = require('./app/routes');
// =================================================================
// factories === ===================================================
// =================================================================

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.API_PORT || 3333; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use(cors());
app.options('/api', cors());

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

registerRoutes(app);

// use morgan to log requests to the console
if(config.debug){
  app.use(morgan('combined'));
}

// basic route (http://localhost:3333)
app.get('/', function(req, res) {
  res.send('Running at http://localhost:' + port + '/api');
});


// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
