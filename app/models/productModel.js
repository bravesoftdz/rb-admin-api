var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Product', new Schema({ 
  id: { type: ObjectId },
  name: { type: String, required: true },
  value: { type: Number, required: true }
}));