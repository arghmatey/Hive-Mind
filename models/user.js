var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  reports: [{
    type: Schema.Types.ObjectId,
    ref: 'Report'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);