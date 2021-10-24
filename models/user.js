const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 7;

const watchListSchema = new Schema({
  id: Number,
}, {
  timestamps: true
});

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: String,
  googleId: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  watchList: [watchListSchema]
}, {
  timestamps: true
});

userSchema.pre('save', function(next) {
  // this is the user being saved.
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);