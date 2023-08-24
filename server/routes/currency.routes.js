const express = require('express')
const Currency = require('../models/Currency')
const router = express.Router({mergeParams:true})

router.get('/',async (req,res)=>{
    try {
        const list = await Currency.find()
        res.status(200).send(list)
    } catch   {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

module.exports=router