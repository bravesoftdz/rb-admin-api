var Profile = require('../models/profileModel');
var objectHelper = require('../helpers/objectHelper');
module.exports = (function(){
  return {
    findByUsername: function (req, res){
      Profile.findOne({ username: req.body.username }, function(err, profile) {
          return res.json(profile);
      });
    },
    add: function (req, res){
      var profile = new Profile();
      objectHelper.merge(req.body, profile);
      profile.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
      });
    }
  };
})();