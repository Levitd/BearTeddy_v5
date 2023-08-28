const express = require('express')
const auth = require('../middleware/auth.middleware')
const Comment = require('../models/Comment')
const User = require('../models/User')
const router = express.Router({mergeParams:true})

router
    .route('/:product_id')
    .get(auth,async (req, res)=>{
        const {product_id} = req.params
        try {
            const {orderBy,equalTo} = req.query
            const list = await Comment.find({product_id:product_id}).sort( { createdAt : 1 })
            res.send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })

router
    .route('/')
    .get(auth,async (req, res)=>{
        try {
            const {orderBy,equalTo} = req.query
            const list = await Comment.find({})
            res.send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })
    .post(auth,async (req, res)=>{
        // console.log('get',req.body, req.query)
        try {
            const newComment = await Comment.create({
                ...req.body,
                user_id:req.user._id
            })
            res.status(201).send(newComment)
        } catch (e) {
            // console.log(e)
            res.status(500).json({
                message: 'На сервере произошла ошибка, попробуйте позже...'
            })
        }
    })

router.delete('/:commentId',auth, async (req, res)=>{
    try {
        const {commentId} = req.params
        const removedComment = await Comment.findById(commentId)
        if (removedComment.userId.toString()===req.user._id){
            await removedComment.remove()
            return res.send(null)
        } else {
            return res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

module.exports=router