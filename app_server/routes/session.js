var express = require('express');
var router = express.Router();
var ctrlSession = require('../controllers/session');

router.get('/new', ctrlSession.new);

router.post('/', ctrlSession.users);

router.get('/:username', ctrlSession.overview);

module.exports = router;

