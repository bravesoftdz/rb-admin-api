var Product = require('../models/productModel');
var objectHelper = require('../helpers/objectHelper');
module.exports = (function(){
  return {
    findAll: function (req, res){
      Product.find({}, function(err, product) {
          return res.json(product);
      });
    },
    delete: function (req, res){
      Product.find({_id: req.params.id}).remove(function (err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    add: function (req, res){
      var product = new Product();
      objectHelper.merge(req.body, product);
      product.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
        
      });
    }
  };
})();