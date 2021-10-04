const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const userCtrl = require('../controllers/user');

router.post('/signUp', userCtrl.signUp);
router.post('/signIn', userCtrl.signIn);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id/image', auth, multer, userCtrl.updateImage);
router.put('/:id/update', auth, userCtrl.updateUser);
router.delete('/:id', auth, multer, userCtrl.deleteUser);

module.exports = router;
