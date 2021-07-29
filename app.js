const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path");
const jimp = require('jimp')
const fs = require("fs/promises");
const moment = require("moment");
//const { v4 } = require("uuid");
const multer = require('multer')


require('dotenv').config()
require('./configs/passport-config')
const api = require('./api/auth')

const { DB_HOST, PORT = 3000 } = process.env

const router = require('./routes/api/contacts');
const { create } = require('./services/contact');

const app = express()

const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR)
const IMG_DIR = path.join(__dirname, 'public', 'images')

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
app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname, 'public')))

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  if (req.file) {
    const { file } = req
    const img = await jimp.read(file.path)
    await img.autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(file.path)
    await fs.rename(file.path, path.join(IMG_DIR, file.originalname)
  }
  res.redirect('/')
})
app.use(function (req, res, next) {
  next(createError(404))
})
const upload = multer({
  storage: storage,
});
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ message: err.message, status: err.status })
})

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  createFolderIsNotExist(UPLOAD_DIR)
  createFolderIsNotExist(IMG_DIR)
  console.log(`Server running. Use on port:${PORT}`)
})


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
