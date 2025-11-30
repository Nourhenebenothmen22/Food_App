const express=require('express')
const router=express.Router()
const {placeOrder, getOrderById}=require('../controllers/OrderController')
const authMiddleware=require('../middlewares/authMiddleware')
router.post('/place',authMiddleware,placeOrder)
router.get('/:orderId', authMiddleware, getOrderById);
module.exports=router