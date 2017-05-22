var Order = require('../models/orderModel');
var objectHelper = require('../helpers/objectHelper');
module.exports = (function(){
  return {
    findAll: function (req, res){
      Order.find({ archived: false }).populate('customer').exec(function(err, order) {
          return res.json(order);
      });
    },
    add: function (req, res){
      var order = new Order();
      objectHelper.merge(req.body, order);
      order.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
      });
    },
    delete: function (req, res){
      Order.find({_id: req.params.id}).remove(function (err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    update: function (req, res){
      Order.findByIdAndUpdate(req.params.id, { $set: req.body } ,function (err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    archive: function (req, res){
      Order.findById(req.params.id, function (err, order) {
        if(err || !order){
          return res.status(400).json(err);
        }
        order.archived = true;
        order.archivedDate = new Date();
        order.save(function(err){
          if(err){
            return res.status(400).json(err);
          }
          return res.status(200).json({ success: true });
        });
      });
    }
    
  };
})();