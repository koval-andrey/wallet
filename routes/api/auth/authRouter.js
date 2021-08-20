const express = require('express')
const path = require('path')
const { auth: ctrl } = require('../../controllers')
const { authenticate, validate } = require('../../middlewares')


const authRouter = express.Router()

authRouter.post('/login', express.json(), ctrl.login)
authRouter.post('/sign-up', express.json(), ctrl.singUp)
authRouter.get('/logout', authenticate, ctrl.logout)

module.exports = authRouter
