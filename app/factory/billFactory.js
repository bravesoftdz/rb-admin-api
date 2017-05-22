var Bill = require('../models/billModel');
var objectHelper = require('../helpers/objectHelper');
module.exports = (function(){
  return {
    findAll: function (req, res){
      Bill.find({ }, function(err, profile) {
          return res.json(profile);
      });
    },
    add: function (req, res){
      var profile = new Bill();
      objectHelper.merge(req.body, profile);
      profile.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
      });
    },
    delete: function (req, res){
      Bill.find({_id: req.params.id}).remove(function (err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    pay: function (req, res){
      Bill.findByIdAndUpdate(req.params.id, 
        { $set: { 
            paid: true,
            paymentDate: req.body.paymentDate
          }
        }, function (err, bill) {
          if(err){
            return res.status(400).json(err);
          }
          return res.status(200).json({ success: true });
      });
    }
    
  };
})();