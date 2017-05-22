var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model('User', new Schema({
  id: { type: ObjectId },
  name: {type: String, required: true }, 
  password: { type: String, required: true, minlength: 8 }, 
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true }
}));