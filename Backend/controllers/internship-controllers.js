const HttpError = require('../models/http-error')
const Company = require('../models/company')
const Student = require('../models/student')
const Internship = require('../models/internship')
const { default: mongoose } = require('mongoose')


const internship = async (req,res,next)=>{

    const {cname,type,supervisor,jobDescrip,ppo,status,paid,feedback,id,c_id} = req.body

    const createdUser = new Internship({
        cname,
        type,
        supervisor,
        jobDescrip,
        ppo,
        status,
        paid,
        feedback,
        cid:{},
        sid:{}
    })

    let company
    try{
        company = await Company.findById(c_id)
    } catch(err){
        return next(new HttpError('Failed to get Company details.',500))
    }
    if(!company){
        return next(new HttpError('Could not find company',404))
    }

    let user
    try{
        user = await Student.findById(id)
    } catch(err){
        return next(new HttpError('Failed to get Student details.',500))
    }
    if(!user){
        return next(new HttpError('Could not find user',404))
    }

    try{
        const sess = await mongoose.startSession()
        sess.startTransaction()
        createdUser.sid = user
        createdUser.cid = company
        user.iid.push(createdUser)
        await createdUser.save({session:sess})
        await user.save({session:sess})
        await sess.commitTransaction()
    } catch(err){
        const error = new HttpError('Failed to save details.',500)
        return next(error)
    }

    res.status(201).json({internship:createdUser.toObject({getters:true})})
}


exports.internship = internship