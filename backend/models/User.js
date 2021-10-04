const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageUrl: {
    type: String,
    required: true,
    default: 'http://127.0.0.1:3000/assets/images/Black.png',
  },
  isAdmin: { type: Boolean, required: true, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
