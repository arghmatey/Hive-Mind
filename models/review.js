var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userReviewing: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  movieId: Number,
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);