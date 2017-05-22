var Plan = require('../models/planModel');
var objectHelper = require('../helpers/objectHelper');
module.exports = (function(){
  return {
    findAll: function (req, res){
      Plan.find({}, function(err, plan) {
          return res.json(plan);
      });
    },
    delete: function (req, res){
      Plan.find({_id: req.params.id}).remove(function (err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    add: function (req, res){
      var plan = new Plan();
      objectHelper.merge(req.body, plan);
      plan.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
        
      });
    }
  };
})();