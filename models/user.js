var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchListSchema = new Schema({
  id: Number,
}, {
  timestamps: true
});

const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  watchList: [watchListSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);