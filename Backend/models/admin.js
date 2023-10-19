const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    pass: {type:String, required:true}
})

module.exports = mongoose.model('Admin',adminSchema)