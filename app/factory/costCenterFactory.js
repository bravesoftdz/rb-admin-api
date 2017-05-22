var CostCenter = require('../models/costCenterModel');
var objectHelper = require('../helpers/objectHelper');
module.exports = (function(){
  return {
    findAll: function (req, res){
      CostCenter.find({}, function(err, costcenter) {
          return res.json(costcenter);
      });
    },
    delete: function (req, res){
      CostCenter.find({_id: req.params.id}).remove(function (err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    add: function (req, res){
      var costcenter = new CostCenter();
      objectHelper.merge(req.body, costcenter);
      costcenter.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
        
      });
    }
  };
})();