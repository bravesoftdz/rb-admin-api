var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var paymentMethosEnum = {
  bankSlip: 'bank_slip',
  money: 'money',
  creditCard: 'credit_card',
  credits: 'credits',
  paypal: 'paypal',
  pagseguro: 'pagseguro',
  moip: 'moip'
};

module.exports = mongoose.model('Order', new Schema({
  id: { type: ObjectId },
  paymentMethod: { type: String, enum: [
    paymentMethosEnum.bankSlip,
    paymentMethosEnum.money,
    paymentMethosEnum.creditCard,
    paymentMethosEnum.credits,
    paymentMethosEnum.paypal,
    paymentMethosEnum.pagseguro,
    paymentMethosEnum.moip
  ], required: true },
  dueDate: { type: Date, required: true },
  paymentDate: { type: Date },
  paid: { type: Boolean, require: true, defaul: false },
  orderValue: { type: Number, required: true },
  paymentValue: { type: Number },
  customer: { type: ObjectId, ref: 'Customer' },
  product: { type: Object, required: true },
  linkToPaymentGateway: { type: String },
  archived: { type: Boolean, require: true, default: false },
  archivedDate: { type: Date }
}));