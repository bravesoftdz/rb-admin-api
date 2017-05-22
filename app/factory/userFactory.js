var User = require('../models/userModel');
var profileFactory = require('../factory/profileFactory');
var cryptoFactory = require('../factory/cryptoFactory');
var sleep = require('sleep');
var config = require('../../config');
var jwt    = require('jsonwebtoken');

module.exports = (function(){
  return {
    add: function(req, res){
      if(config.adminsecret !== req.body.adminsecret){
        res.status(401).send({ 
          success: false, 
          message: 'Not authorized!'
        });
      } 
      else {
        var user = new User({ 
          username: req.body.username,
          name: req.body.name, 
          password: cryptoFactory.shuffle(req.body.password),
          admin: req.body.admin || false,
          email: req.body.email
        });
  
        user.save(function(err) {
          if(err){
            return res.status(400).json(err);
          } else {
            console.log('User saved successfully');
            console.log('User: ' + req.body.username);
            profileFactory.add(req, res);
            return res.status(201).json({ success: true });
          }
        });
      }
    },
    authenticate: function(req, res){
      var self = this;
      this.req = req;
      this.res = res;
      
      if(config.debug){
        sleep.sleep(2);
      }
      
      User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) {
          throw err;
        }
        
        if (user === undefined || user === null) {
          return self.res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          var valid = cryptoFactory.compare(self.req.body.password, user.password);
          if (!valid) {
            return self.res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
          } 
          else {
            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, config.secret, {
              expiresInMinutes: 1440 // 24 hours
            });
    
            return self.res.status(200).json({
              success: true,
              message: 'Authenticated!',
              user: {
                token: token,
                sessionId: req.sessionId,
                id: user.id,
                email: user.email,
                role: user.role
              }
            });
          }
        }
      });
    },
    logout: function (req, res){
      delete req.body.token;
      delete req.param('token'); 
      delete req.headers['x-access-token'];
      return res.status(200).json({
          "message": "User has been successfully logged out"
      });
    }
  };
})();