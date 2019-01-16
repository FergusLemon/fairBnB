'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/users/:user-id', usersController.getUser);
router.post('/users', usersController.createUser);
router.put('/users/:user-id', usersController.updateUser);
router.delete('/users/:user-id', usersController.deleteUser);

module.exports = router;
