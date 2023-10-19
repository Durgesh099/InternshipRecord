const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const Company = require('../models/company')
const Student = require('../models/student')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const secretkey = 'this-key-is-seceret!'

function generateJWT(user){
    return jwt.sign({user},secretkey,{expiresIn:"1h"})
}

const company = async (req,res,next)=>{

    const {name,location,industry,cemail,cphn,id} = req.body

    const createdUser = new Company({
        name,
        location,
        industry,
        cemail,
        cphn
    })

    let user
    try{
        user = await Student.findById(id)
    } catch(err){
        return next(new HttpError('Company details failed.',500))
    }
    if(!user){
        return next(new HttpError('Could not find user',404))
    }

    try{
        await createdUser.save()
        token = generateJWT(createdUser.toObject({getters:true}))
    } catch(err){
        console.log(err)
        const error = new HttpError('Failed to save company details.',500)
        return next(error)
    }

    res.status(201).json({company:createdUser.toObject({getters:true}), token:token})
}

exports.company = company