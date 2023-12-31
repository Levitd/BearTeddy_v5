const express = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult}  =require('express-validator')
const User = require('../models/User')
const {generateUserData} = require("../utils/helper");
const tokenService= require('../services/token.services')
const router = express.Router({mergeParams:true})
const cors = require('cors');

const signUpValidations = []

router.post('/signUp',cors(), [
    check('email','Некорректный email').isEmail(),
    check('password','Минимальная длина паролья 8 символов').isLength({min:8}),
    async (req,res)=>{
    try{
        const error = validationResult(req)
        if (!error.isEmpty()) return res.status(400).json({
            error:{
                message: 'INVALID_DATA',
                code: 400
                // error:error.array()
            }
        })
        const {email, password} = req.body
        // console.log(email,password)
        const existingUser = await User.findOne({email})
        if (existingUser){
             return res.status(400).json({
                 error:{
                     message:"EMAIL_EXISTS",
                     code:400
                 }
             })
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const newUser = await User.create({
            ...generateUserData(),
            ...req.body,
            password: hashedPassword
        })
        const tokens = tokenService.generate({_id: newUser._id})
        await tokenService.save(newUser._id, tokens.refreshToken)

        res.status(201).send({...tokens, localId: newUser._id})
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...',
            error:e
        })
    }
}])
router.post('/signInWithPassword',cors(),[
    check('email','Email некорректный').normalizeEmail().isEmail(),
    check('password','Пароль не может быть пустым').exists(),
    async (req,res)=>{
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) return res.status(400).json({
            error:{
                message: 'INVALID_DATA',
                code: 400
                // error:error.array()
            }
        })

        const {email, password} = req.body
        // console.log(email,password)
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(400).send({
                error:{
                    message: 'EMAIL_NOT_FOUND',
                    code: 400
                }
            })
        }

        const isPasswordEqual =  await bcrypt.compare(password,existingUser.password)

        if(!isPasswordEqual){
            return res.status(400).send({
                error:{
                    message: 'INVALID_PASSWORD',
                    code: 400
                }
            })
        }

        const tokens = tokenService.generate({_id: existingUser._id})
        await tokenService.save(existingUser._id, tokens.refreshToken)

        // console.log({...tokens, localId: existingUser._id})
        res.status(200).send({...tokens, localId: existingUser._id})

    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }

}])

function isTokenInvalid(data, dbToken){
    return !data || !dbToken || data._id!==dbToken?.user?.toString()
}
router.post('/token', cors(), async (req,res)=>{
    try {
        const {refresh_token: refreshToken} = req.body
        if(!refreshToken){
            res.status(205).json({message:"Refresh token not get"})
            return
        }
        const data=await tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)
        if( isTokenInvalid(data, dbToken) ){
            return res.status(401).json({message:"Unauthorized"})
        }
        const tokens = tokenService.generate({_id: data._id})
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({...tokens, localId:data._id})
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка, попробуйте позже...'
        })
    }
})

module.exports=router