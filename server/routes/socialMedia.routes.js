const express = require('express')
const SocialMedia = require('../models/SocialMedia')
const router = express.Router({mergeParams:true})

router.get('/',async (req,res)=>{
    try {
        const list = await SocialMedia.find()
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

module.exports=router