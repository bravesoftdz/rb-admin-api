var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Plan', new Schema({ 
  id: { type: ObjectId },
  name: { type: String, required: true },
  expirationMonths: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  product : {type: Schema.Types.ObjectId, ref: 'Product', required: true }
}));