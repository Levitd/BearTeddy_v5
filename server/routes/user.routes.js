const express = require('express')
const User = require('../models/User')
const auth  = require('../middleware/auth.middleware')
const router = express.Router({mergeParams:true})
const cors = require('cors');
const mongoose = require('mongoose')

router.get('/',cors(),async (req,res)=>{
    const {_id} = req.query
    try {
        const list = await User.find(_id ? {_id:_id} :{},{password: 0})
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})
router.post('/',cors(),async (req,res)=>{
    // const {_id} = req.query
    // console.log(req.query, req.body, req.params)
    try {
        const newArray = req.body.array
        const list = await User.find({_id: {$in: newArray}},{password: 0})
        res.status(200).send(list)
    } catch  (e) {
        console.log(e)
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

router.patch('/:userId', auth,cors(), async (req,res)=>{
    try {
        const {userId} = req.params
        console.log(userId, req.user._id)
        if (userId===req.user._id){
            const id =new mongoose.Types.ObjectId(userId)
            // console.log(req.body)
            const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})
            res.send(updatedUser) // status(200) - можно не отсылать
        } else {
            res.status(401).json({
                message: 'Unauthorized user!='
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})



module.exports=router