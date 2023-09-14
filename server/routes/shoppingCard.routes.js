const express = require('express')
const ShoppingCard = require('../models/ShoppingCard')
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams:true})
const cors = require('cors');
const mongoose = require("mongoose");
const User = require("../models/User");

router.get('/',auth, cors(), async (req,res)=>{
    try {
        let list
        // console.log(req.user._id)
        if (req.user._id){
            list = await ShoppingCard.find({user_id:req.user._id})
        } else {
            res.status(401).json({message:'GET! only for authorized user'})
        }
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

router.post('/',auth,cors(),async (req, res)=>{
    try {
            const newShop = await ShoppingCard.create({
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
router.patch('/', auth, cors(), async (req,res)=>{
    try {
        if (req.user._id) {
            const {shopId} = req.body
            //проверим корзины у пользователя
            let id_card = await ShoppingCard.find({user_id: req.user._id})
            if (id_card.length < 1) {
                id_card = await ShoppingCard.create(req.body)
                res.send(id_card)
            } else {
                let prodArray
                if ('user_id' in req.body) {
                    prodArray=req.body.products
                } else {
                    prodArray = req.body
                }
                const updatedShoppingCard = await ShoppingCard.findOneAndUpdate({user_id: req.user._id}, {products:prodArray}, {new:true})
                res.send(updatedShoppingCard) //
            }
        } else {
            res.status(401).json({
                code: 401,
                message: 'Unauthorized'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
router.delete('/', auth, cors(), async (req,res)=>{
    try {
        if (req.user._id) {
            const {product_id} =req.query
            //проверим корзины у пользователя
            let id_card = await ShoppingCard.find({user_id: req.user._id})
            if (id_card.length < 1) {
                res.status(406).json({message:'Basket iz empty'})
            } else {
                const products=id_card[0].products.filter((p)=>p.product_id!==product_id)
                const updatedShoppingCard = await ShoppingCard.findOneAndUpdate({user_id: req.user._id}, {products:products}, {new:true})
                res.send(updatedShoppingCard) //
            }
        } else {
            res.status(401).json({
                message: 'Unauthorized'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})


module.exports=router