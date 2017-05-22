var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('CostCenter', new Schema({ 
  id: { type: ObjectId },
  name: { type: String, required: true }
}));