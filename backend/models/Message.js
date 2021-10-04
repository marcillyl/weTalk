const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
