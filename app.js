const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path");
const fs = require("fs/promises");
const moment = require("moment");
//const { v4 } = require("uuid");
const multer = require('multer')

require('dotenv').config()
require('./configs/passport-config')
const api = require('./api/auth')

const { DB_HOST, PORT = 3000 } = process.env

const router = require('./routes/api/contacts')

const app = express()

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true) return
    };
    cb(null, false);

  },
});

const upload = multer({
  storage: storage,
});

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
