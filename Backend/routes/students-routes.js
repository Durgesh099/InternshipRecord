const express = require('express')
const {check} = require('express-validator')
const usersControllers = require('../controllers/student-controllers')
const router = express.Router()

router.post('/signup',
[
    check('name').not().isEmpty(),
    check('course').not().isEmpty(),
    check('divi').not().isEmpty(),
    check('roll').not().isEmpty(),
    check('email').normalizeEmail().isEmail(), //Test@test.com -> test@test.com
    check('pass').isLength({min:6}),
    check('teacher').not().isEmpty(),
    check('gender').not().isEmpty(),
    check('phn').not().isEmpty(),
    check('address').not().isEmpty()
],
usersControllers.signup)

router.post('/',usersControllers.login)

module.exports = router