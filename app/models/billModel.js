var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Bill', new Schema({ 
  id: { type: ObjectId },
  name: { type: String, required: true },
  value: { type: Number, required: true },
  paymentDate: { type: Date, required: false },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, required: true, default: false },
  costCenter : {type: Schema.Types.ObjectId, ref: 'CostCenter', required: true}
}));