var debug = process.argv.indexOf('--debugmode') >= 0;
var fs = require('fs');

var configurationFile = './config.json';

var configuration = JSON.parse(fs.readFileSync(configurationFile));

var database = configuration.database.development;

var database =  process.env.database || configuration.database.production;
if(debug){
   database = configuration.database.development;
}
module.exports = {
  'debug': debug,
  'secret': configuration.secret,
  'adminsecret': configuration.adminsecret,
  'database': database
};
