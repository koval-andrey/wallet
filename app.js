const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
require('./configs/passport-config')
const api = require('./api/auth')

const { DB_HOST, PORT = 3000 } = process.env

const router = require('./routes/api/contacts')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/contacts', router)
app.use('/api/auth', api.auth)
app.use('/api/users', api.users)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(async () => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch((error) => console.log(error))

module.exports = app
