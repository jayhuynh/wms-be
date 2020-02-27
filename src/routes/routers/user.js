const userController = require('../controllers/userController');
const userHelper = require('../../middlewares/userHelper')

const express = require('express');
const router = express.Router();

//get users
router.get('/',userHelper.validateGetUser(), userController.getUsers);

//get user by id
router.get('/:id', userController.getUser);

//delete user by id
router.delete('/:id', userController.deleteUser);

//create user (with validateCreateUser middleware)
router.post('/', userHelper.validateCreateUser(), userController.createUser);

module.exports = router;