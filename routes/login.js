const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

router.get('/', loginController.index);
router.post('/', loginController.login);
router.get('/new-act', loginController.newAct);
router.post('/new', loginController.new);

module.exports = router;
