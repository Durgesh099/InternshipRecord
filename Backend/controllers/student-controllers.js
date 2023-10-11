const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const User = require('../models/student')
const jwt = require('jsonwebtoken')
const secretkey = 'this-key-is-seceret!'

function generateJWT(user){
    return jwt.sign({user},secretkey,{expiresIn:"1h"})
}


const signup = async (req,res,next)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return next(new HttpError('Invalid inputs passed,please check your data.',422))
    }

    const {name,course,roll,divi,email,pass,teacher,gender,phn,address} = req.body
    
    let existingUser
    try{
        existingUser = await User.findOne({email:email})
    } catch{
        const error = new HttpError('Signup Failed, please try again.',500)
        return next(error)
    }

    if(existingUser){
        const error = new HttpError('User exists already, please login instead.',422)
        return next(error)
    }

    const createdUser = new User({
        name,
        course,
        divi,
        roll,
        email,
        pass,
        teacher,
        gender,
        phn,
        address,
        cid: []
    })
    try{
        await createdUser.save()
        delete createdUser.pass
        token = generateJWT(createdUser)
    } catch(err){
        const error = new HttpError('Signing Up failed, please try again.',500)
        return next(error)
    }

    res.status(201).json({user:createdUser.toObject({getters:true}), token:token})
}

const login = async (req,res,next)=>{
    const {email, password} = req.body;
    
    let existingUser
    try{
        existingUser = await User.findOne({email:email})
    } catch{
        const error = new HttpError('Logging in Failed, please try again.',500)
        return next(error)
    }

    if(!existingUser || existingUser.password!==password){
        const error = new HttpError('Invalid credentials, could not log you in.',401)
        return next(error)
    }
    delete existingUser.pass
    const token = generateJWT(existingUser)
    res.json({message: 'Logged In',token:token})
}


exports.signup = signup
exports.login = login