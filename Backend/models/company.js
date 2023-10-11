const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name: {type:String, required:true},
    location: {type:String, required:true},
    industry: {type:String, required:true},
    cemail: {type:String, required:true},
    cphn: {type:String, required:true},
    supervisor: {type:String, required:true}
})

module.exports = mongoose.model('Company',companySchema)