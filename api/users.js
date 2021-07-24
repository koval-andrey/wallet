const express = require('express')
const passport = require('passport')
const { authenticate } = require('../middlewares')
const { users: ctrl } = require('../controllers')

const router = express.Router

router.get('/profile', authenticate, ctrl.getProfile)

module.exports = router
