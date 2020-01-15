const userController=require('../controllers/userController')

const express=require('express')
const router=express.Router();


router.get('/',(req,res)=>{
    res.send('USER INDEX')
})

router.get('/list',userController.listAll)

router.get('/:id',userController.listById)

module.exports=router