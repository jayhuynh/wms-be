const userController=require('../controllers/userController');

const express=require('express');
const router=express.Router();

router.get('/',userController.getUsers);

router.get('/:id',userController.getUser);

//delete multiple users
router.delete('/',userController.deleteUsers);

//delete user by id
router.delete('/:id',userController.deleteUser);

module.exports=router;