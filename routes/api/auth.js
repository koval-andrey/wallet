/* const express = require('express')
const path = require('path')
const { auth: ctrl } = require('../../controllers')
const { authenticate, validate } = require('../../middlewares')
const multer = require('multer')

const routerAuth = express.Router()

const tempDir = path.join(process.cwd(), 'temp')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})
const uploadMiddleware = multer({
  storage,
})

routerAuth.post('/register', express.json(), ctrl.register)
routerAuth.post('/login', express.json(), ctrl.login)
routerAuth.get('/logout', authenticate, ctrl.logout)
routerAuth.get('/current', authenticate, ctrl.getProfile)
routerAuth.get('/verify/:token', authenticate, ctrl.verify)
routerAuth.post('/verify', validate, ctrl.verifyEmail)
routerAuth.patch(
  '/avatars',
  authenticate,
  uploadMiddleware.single('avatar'),
  ctrl.updateAvatar
)

module.exports = routerAuth */
