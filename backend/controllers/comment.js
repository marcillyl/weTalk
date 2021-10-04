const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getAllComments = (req, res, next) => {
  Comment.find({ messageId: req.params.id })
    .populate('user')
    .sort('-createdAt')
    .then((comments) => res.status(200).json(comments))
    .catch(() => {
      res.status(400).send(new Error('Error!'));
    });
};

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    userId: req.userId,
    content: req.body.content,
    messageId: req.params.id,
    user: req.userId,
  });
  comment
    .save()
    .then(() => res.status(200).json(comment))
    .catch(() => {
      res.status(400).send(new Error('Error!'));
    });
};

exports.deleteComment = (req, res, next) => {
  Comment.findById(req.params.id).then((comment) => {
    if (req.isAdmin === true || req.userId === comment.userId) {
      Comment.deleteOne({ _id: req.params.id })
        .then(() => res.status(200))
        .catch(() => {
          res.status(400).send(new Error('Error!'));
        });
    } else {
      res.status(403).send(new Error('Unauthorized!'));
    }
  });
};
