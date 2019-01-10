var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user');

router.get('/new', ctrlUser.new);

router.post('/', ctrlUser.users);

router.get('/:username', ctrlUser.overview);

module.exports = router;
