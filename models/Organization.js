const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organization', organizationSchema);
