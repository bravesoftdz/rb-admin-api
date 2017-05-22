var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Profile', new Schema({ 
  id: { type: ObjectId },
  username: { type: String, required: true, unique: true},
  facebook: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  phone: { type: String },
  address: { type: String },
  bornDate: { type: Date }
}));