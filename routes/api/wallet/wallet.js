const express = require('express')
const { wallet: ctrl } = require('../../../controllers')


const walletRouter = express.Router()

walletRouter.get('/transactions', ctrl.getAllTransactions)
walletRouter.post('/transactions', ctrl.createTransactions)

module.exports = walletRouter
