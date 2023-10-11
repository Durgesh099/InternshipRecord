const express = require('express')
const {check} = require('express-validator')
const companyControllers = require('../controllers/company-controllers')
const router = express.Router()

router.post('/company',companyControllers.company)

module.exports = router