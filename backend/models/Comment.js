const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    messageId: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);
