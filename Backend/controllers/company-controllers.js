const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error')
const Company = require('../models/company')
const Student = require('../models/student')
const { default: mongoose } = require('mongoose')
const secretkey = 'this-key-is-seceret!'

const company = async (req,res,next)=>{

    const {name,location,industry,cemail,cphn,supervisor,id} = req.body
    
    let existingUser
    try{
        existingUser = await Company.findOne({cemail:cemail})
    } catch{
        const error = new HttpError('Internal Server Error.',500)
        return next(error)
    }

    if(existingUser){
        const error = new HttpError('Company exists already.',422)
        return next(error)
    }

    const createdUser = new Company({
        name,
        location,
        industry,
        cemail,
        cphn,
        supervisor
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
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createdUser.save({session:sess})
        user.cid.push(createdUser)
        await user.save({session:sess})
        await sess.commitTransaction()
    } catch(err){
        const error = new HttpError('Failed to save company details.',500)
        return next(error)
    }

    res.status(201).json({company:createdUser.toObject({getters:true})})
}

exports.company = company