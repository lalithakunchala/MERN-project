var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default:"admin"
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('admin', AdminSchema);