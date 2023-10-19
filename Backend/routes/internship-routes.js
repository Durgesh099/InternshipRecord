const express = require('express')
const {check} = require('express-validator')
const internshipControllers = require('../controllers/internship-controllers')
const router = express.Router()

router.post('/internship',internshipControllers.internship)

module.exports = router