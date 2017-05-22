var bcrypt = require('bcrypt');
var crypto = require('crypto');
var Order = require('../models/orderModel');
var Customer = require('../models/customerModel');
var Bill = require('../models/billModel');

module.exports = (function(){
  return {
    countAllActiveCustomers: function (req, res){
      Customer.find({ enabled: true }).exec(function(err, customers) {
        return res.json(customers.length);
      });
    },
    ordersNotPaidsWithDueDateInNextDays: function (req, res){
      var days = req.body.days || 15;
      var today = new Date();
      var nextDate = new Date();
      nextDate.setDate(today.getDate()+days);
      Order.find({ archived: false, paid: false }).populate('customer').exec(function(err, order) {
          return res.json(order.length);
      });
      
      
      // Order.find({ dueDate: { "$gte": today, "$lt": nextDate }, archived: false, paid: false }).populate('customer').exec(function(err, orders) {
      //   return res.json(orders.length);
      // });
    },
    delayedOrders: function(req, res) {
      var today = new Date();
      Order.find({ dueDate: { "$lt": today }, paid: false, archived: false }).exec(function(err, orders) {
        return res.json(orders.length);
      });
    },
    billsToPayInNextDays: function (req, res){
      var days = req.body.days || 15;
      var today = new Date();
      var nextDate = new Date();
      nextDate.setDate(today.getDate()+days);
      Bill.find({ dueDate: { "$gte": today, "$lt": nextDate }, paid: false }).exec(function(err, bills) {
        return res.json(bills.length);
      });
    }
  }
})();
