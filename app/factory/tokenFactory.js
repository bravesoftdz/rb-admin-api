var jwt    = require('jsonwebtoken');
var config = require('../../config');
module.exports = (function(){
  var verify = function (req, res, token, callback){
      jwt.verify(token, config.secret, callback);
  };
  var next =  function(req, res, next){
    if(req.url.indexOf('/api/login') > -1){
      next();
    }
    var token = req.body.token || req.headers['x-access-token'];
    if (token) {
      verify(req, res, token, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;  
          next();
        }
      });
    } else {
      return res.status(403).send({ 
        success: false, 
        message: 'No token provided.'
      });
    }
  };
  var data = {
    next: next,
    verify: verify
  };
  return data;
})();