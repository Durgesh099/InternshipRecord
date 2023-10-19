const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const secretkey = 'this-key-is-seceret!'

function generateJWT(user){
    return jwt.sign({user},secretkey,{expiresIn:"1h"})
}

const login = async (req,res,next)=>{
    const {pass} = req.body;
    
    let existingUser
    try{
        existingUser = await Admin.findOne({pass:pass})
    } catch{
        const error = new HttpError('Logging in Failed, please try again.',500)
        return next(error)
    }

    if(!existingUser || existingUser.pass!==pass){
        const error = new HttpError('Invalid credentials, could not log you in.',401)
        return next(error)
    }
    delete existingUser.pass
    const token = generateJWT(existingUser.toObject({getters:true}))
    res.json({message: 'Logged In',token:token})
}

exports.login = login