var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');

router.get('/', mainController.index);

router.get('/signout', mainController.signOut);

module.exports = router;
