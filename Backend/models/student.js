const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {type:String, required:true},
    course: {type:String, required:true},
    divi: {type:String, required:true},
    roll: {type:String, required:true},
    email: {type:String, required:true},
    pass: {type:String, required:true},
    teacher: {type:String, required:true},
    gender: {type:String, required:true},
    phn: {type:String, required:true},
    address: {type:String, required:true},
    iid:[{type:mongoose.Types.ObjectId,required:true,ref:'Internship'}]
})

module.exports = mongoose.model('User',studentSchema)