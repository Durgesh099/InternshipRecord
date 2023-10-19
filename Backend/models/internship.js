const mongoose = require('mongoose')
const Schema = mongoose.Schema

const internshipSchema = new Schema({
    cname: {type:String, required:true},
    type: {type:String, required:true},
    supervisor: {type:String, required:true},
    jobDescrip: {type:String, required:true},
    ppo: {type:String, required:true},
    status: {type:String, required:true},
    paid: {type:String, required:true},
    feedback: {type:String, required:true},
    cid: {type: mongoose.Types.ObjectId, required:true, ref:'Company'},
    sid: {type: mongoose.Types.ObjectId, required:true, ref:'Student'}
})

module.exports = mongoose.model('Internship',internshipSchema)