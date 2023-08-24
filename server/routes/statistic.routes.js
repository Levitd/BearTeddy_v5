const express = require('express')
const mongoose = require('mongoose')
const Statistic = require('../models/Statistic')
const config = require('config')
const router = express.Router({mergeParams:true})
const auth  = require('../middleware/auth.middleware')
const Product = require("../models/Product");


router.get('/',auth, async (req,res)=>{
    const countViewed=config.get('statisticLastViewed')
    const userIdAuth = req.user._id
    const {user_id} = req.query
    if (userIdAuth!==user_id){
        return res.status(401).json({message: 'error send user'})
    }
    const id =new mongoose.Types.ObjectId(userIdAuth)
    try {
        // const list = await Statistic.find({"user_id":userIdAuth}).sort( { createdAt : -1 }).limit( countViewed )
        const list = await Statistic.find({user_id : id})
        res.status(200).send(list)
    } catch  (e) {
        console.log(e)
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
router.post('/',async (req,res)=>{
    // Если просматривает авторизованный, то в запросе надо прислать user_Id
    // От накручивания просмотров, один пользователь может просматривать 1 товар не чаще 1 раз в 5 минут
    let {product_id, user_id} = req.body
    try {
        const id = new mongoose.Types.ObjectId(product_id)
        const lastViewed = await Statistic.findOne({product_id: id, user_id: user_id},{createdAt:1},{new:true}).sort({createdAt:-1})
        // console.log(Date.parse(lastViewed.createdAt),Date.now(), (Date.now()-Date.parse(lastViewed.createdAt))/1000>5*60*60)
        const createdAt = !lastViewed?.createdAt ? false : lastViewed.createdAt
        if (!createdAt || (Date.now()-Date.parse(createdAt))/1000>300){ // 300
            const newRecord = await Statistic.create({
                user_id:user_id, product_id:product_id
            })
            //изменим счетчик просмотров, просмотры автора не учитываем
            const autor_product = await Product.find({_id: id}, {user_id: 1, viewed:1})
            let autorUser = autor_product[0].user_id
            autorUser = String(autorUser).split('"')[0]
            let coutView = autor_product[0].viewed
            if (user_id!==autorUser){
                coutView = await Product.updateOne({_id: id},{$inc:{viewed:1}},{new:true})
            }
            res.status(201).send(newRecord)
        } else {
            res.status(201).send([{name:'No add viewed'}])
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'Post - На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
module.exports=router