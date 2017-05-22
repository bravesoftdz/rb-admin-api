var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('Customer', new Schema({
  id: { type: ObjectId },
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String },
  cnpj: { type: String},
  address: { type: String },
  addressComplement: { type: String },
  state: { type: String },
  city: { type: String }, 
  phone: { type: String },
  enabled: { type: Boolean, default: false },
  registredAt: { type: Date },
  updatedAt: { type: Date, default: Date.now() },
}));