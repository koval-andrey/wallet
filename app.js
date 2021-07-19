const express = require('express')
// const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const { DB_HOST, PORT = 3000 } = process.env

const router = require('./routes/api/contacts')

const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', router)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT)
    console.log('Database connection successful')
  })
  .catch((error) => console.log(error))

module.exports = app
