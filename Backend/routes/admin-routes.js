const express = require('express')
const {check} = require('express-validator')
const adminControllers = require('../controllers/admin-controllers')
const router = express.Router()

router.post('/admin',adminControllers.login)

module.exports = router