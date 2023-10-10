const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/students-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,POST,PATCH,DELETE')
    next()
})

app.use('/', usersRoutes)

app.use((req,res,next)=>{
    throw new HttpError('Could not find this route.',404)
})

app.use((error, req, res, next)=>{
    if(res.headerSent)
        return next(error)
    res.status(error.code || 500).json({message: error.message || 'An unknwon error occured!'})
})

mongoose
.connect('mongodb+srv://Durgesh:sonDURG@cluster0.elxa07e.mongodb.net/intern?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{
        console.log('Server is running...')
    })
})
.catch(err=>{
    console.log(err)
})