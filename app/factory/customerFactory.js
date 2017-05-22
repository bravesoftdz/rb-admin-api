var mongo = require('mongodb');
var Customer = require('../models/customerModel');
var objectHelper = require('../helpers/objectHelper');
var BSON = mongo.BSONPure;

module.exports = (function(){
  return {
    findByEmail: function (req, res){
      Customer.findOne({ email: req.body.email }, function(err, customer) {
          return res.json(customer);
      });
    },
    findById: function (req, res){
      Customer.findOne( { '_id': req.params.id } , function(err, customer) {
          return res.json(customer);
      });
    },
    findByName: function (req, res){
      Customer.find( { name : new RegExp(req.body.name, 'i') } , function(err, customer) {
          return res.json(customer);
      });
    },
    findAll: function (req, res){
      Customer.find({}, function(err, customer) {
          return res.json(customer);
      });
    },
    update: function (req, res){
      Customer.findById(req.body.id || req.body._id, function(err, customer){
        if(err){
          return res.status(400).json(err);
        }
        objectHelper.merge(req.body, customer);
        customer.save(function(err){
          if(err){
            return res.status(400).json(err);
          }
          return res.status(200).json({ success: true });
        });
        
      });
    },
    delete: function (req, res){
      Customer.remove( { _id: req.params.id }, function(err, result){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(200).json({ success: true });
      });
    },
    add: function (req, res){
      var customer = new Customer();
      objectHelper.merge(req.body, customer);
      customer.registredAt = Date.now();
      customer.enabled = true;
      customer.save(function(err){
        if(err){
          return res.status(400).json(err);
        }
        return res.status(201).json({ success: true });
      });
    }
  };
})();
