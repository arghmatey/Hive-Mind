var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userReporting: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: String,
    content: String,
    rating: {
      type: Number, 
      min: 1, 
      max: 10
    },
    usersWatching: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
  }, {
    timestamps: true
  });

  
module.exports = mongoose.model('Report', reportSchema);