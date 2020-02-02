const userController=require('../controllers/userController');

const express=require('express');
const router=express.Router();

//get users
router.get('/',userController.getUsers);

//get user by id
router.get('/:id',userController.getUser);

//delete user by id
router.delete('/:id',userController.deleteUser);

module.exports=router;