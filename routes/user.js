const express = require('express');
const router = express.Router();
const {
    userValidationRules,
    validate
} = require('../middleware/validator.js')

const userCtrl = require('../controllers/user');

router.post('/signup', userValidationRules(), validate, userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router;