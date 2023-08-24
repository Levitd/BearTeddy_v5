const express = require('express')
const Shop = require('../models/Shop')
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams:true})
const cors = require('cors');
const mongoose = require("mongoose");
const User = require("../models/User");

router.get('/',cors(), async (req,res)=>{
   const {user_id}=req.query
    try {
        let list
        if (user_id){
            list = await Shop.find({user_id:user_id})
        } else {
            list = await Shop.find()
        }
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

router.get('/:shopId',cors(), async (req,res)=>{
    const {shopId} = req.params
    try {
        const list = await Shop.findById(shopId)
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
router.post('/',auth,cors(),async (req, res)=>{
    try {
        console.log(req.body)
            const newShop = await Shop.create({
                ...req.body,
                user_id:req.user._id
            })
            res.status(201).send(newShop)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })
router.patch('/:shopId', auth,cors(), async (req,res)=>{
    try {
        const {shopId} = req.params

        if (req.user._id){
            const id =new mongoose.Types.ObjectId(shopId)
            const updatedShop = await Shop.findByIdAndUpdate(id, req.body, {new:true})
            res.send(updatedShop) // status(200) - можно не отсылать
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})


module.exports=router