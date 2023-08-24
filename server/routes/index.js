const express = require('express')
const router = express.Router({mergeParams:true})

router.use('/auth',require('./auth.routes'))
router.use('/shop',require('./shop.routes'))
router.use('/currency',require('./currency.routes'))
router.use('/socialMedia',require('./socialMedia.routes'))
router.use('/user',require('./user.routes'))
router.use('/product',require('./product.routes'))
router.use('/statistic',require('./statistic.routes'))
router.use('/shoppingCard',require('./shoppingCard.routes'))
router.use('/comment',require('./comment.routes'))

module.exports=router