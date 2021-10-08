const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
const Message = require('../models/Message');
const Comment = require('../models/Comment');

exports.signUp = (req, res, next) => {
  if (
    validator.isEmail(req.body.email) &&
    validator.isStrongPassword(req.body.password, {
      minSymbols: 0,
      minLength: 7,
    })
  ) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(200))
        .catch(() => {
          res.status(400).send(new Error('Error!'));
        });
    });
  } else {
    throw 'Error!';
  }
};

exports.signIn = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).send(new Error('Error!'));
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send(new Error('Error!'));
          }
          res.status(200).json({
            isAdmin: user.isAdmin,
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
              },
              process.env.TOKEN,
              { expiresIn: '10h' }
            ),
          });
        })
        .catch(() => {
          res.status(500).send(new Error('Error!'));
        });
    })
    .catch(() => {
      res.status(500).send(new Error('Error!'));
    });
};

exports.getOneUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) =>
      res.status(200).json({
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
      })
    )

    .catch(() => {
      res.status(400).send(new Error('Error !'));
    });
};

exports.updateImage = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    {
      imageUrl: `${req.protocol}://${req.get('host')}/assets/images/${
        req.file.filename
      }`,
    }
  )
    .then(() => res.status(200))
    .catch(() => {
      res.status(400).send(new Error('Error !'));
    });
};

exports.updateUser = (req, res, next) => {
  const field = req.body.field;
  switch (field) {
    case 'username':
      User.updateOne(
        { _id: req.params.id },
        {
          username: req.body.data,
        }
      )
        .then(() => res.status(200).json({ feedback: 'Username updated !' }))
        .catch(() => {
          res.status(400).send(new Error('Error !'));
        });
      break;
    case 'email':
      if (validator.isEmail(req.body.data)) {
        User.updateOne(
          { _id: req.params.id },
          {
            email: req.body.data,
          }
        )
          .then(() => res.status(200).json({ feedback: 'Email updated !' }))
          .catch(() => {
            res.status(400).send(new Error('Error !'));
          });
      } else {
        return res.status(400).send(new Error('Error !'));
      }
      break;
    case 'password':
      if (
        validator.isStrongPassword(req.body.data, {
          minSymbols: 0,
          minLength: 7,
        })
      ) {
        bcrypt.hash(req.body.data, 10).then((hash) => {
          User.updateOne({ _id: req.params.id }, { password: hash })
            .then(() =>
              res.status(200).json({ feedback: 'Password updated !' })
            )
            .catch(() => {
              res.status(400).send(new Error('Error !'));
            });
        });
      } else {
        return res.status(400).send(new Error('Error !'));
      }
      break;
    default:
      res.status(500).send(new Error('Error!'));
  }
};

exports.deleteUser = async (req, res, next) => {
  await Message.deleteMany({ userId: req.params.id });
  await Comment.deleteMany({ userId: req.params.id });
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200))
    .catch(() => {
      res.status(400).send(new Error('Error!'));
    });
};
