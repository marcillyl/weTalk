const User = require('../models/User');
const Message = require('../models/Message');
const Comment = require('../models/Comment');

exports.getAllMessages = (req, res, next) => {
  Message.find()
    .populate('user')
    .sort('-createdAt')
    .then((messages) => res.status(200).json(messages))
    .catch(() => {
      res.status(400).send(new Error('Error!'));
    });
};

exports.createMessage = (req, res, next) => {
  let imageUrl = '';
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/assets/images/${
      req.file.filename
    }`;
  }
  const message = new Message({
    userId: req.userId,
    content: req.body.content,
    imageUrl: imageUrl,
    user: req.userId,
  });
  message
    .save()
    .then(() => res.status(200).json(message))
    .catch(() => {
      res.status(400).send(new Error('Error!'));
    });
};

exports.deleteMessage = (req, res, next) => {
  Message.findById(req.params.id).then((message) => {
    if (req.isAdmin === true || req.userId === message.userId) {
      Message.deleteOne({ _id: req.params.id })
        // Comment.deleteMany({ messageId: req.params.id })
        .then(() => res.status(200))
        .catch(() => {
          res.status(400).send(new Error('Error!'));
        });
    } else {
      res.status(403).send(new Error('Unauthorized!'));
    }
  });
};
