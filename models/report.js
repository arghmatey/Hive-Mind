var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: String
}, {
  timestamps: true
});

const reportSchema = new Schema({
  userReporting: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  movie: {
    id: Number,
    title: String,
    poster: String
  },
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);