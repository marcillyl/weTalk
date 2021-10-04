const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const messageCtrl = require('../controllers/message');

router.get('/', auth, messageCtrl.getAllMessages);
router.post('/', auth, multer, messageCtrl.createMessage);
router.delete('/:id', auth, multer, messageCtrl.deleteMessage);

module.exports = router;
