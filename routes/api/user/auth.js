const express = require('express')
const path = require('path')
const { auth: ctrl } = require('../../../controllers/contacts')
const { authenticate } = require('../../../middlewares')
const multer = require('multer')

const router = express.Router()

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

router.post('/register', express.json(), ctrl.register)
router.post('/login', express.json(), ctrl.login)
router.get('/logout', authenticate, ctrl.logout)
router.get('/current', authenticate, ctrl.getProfile)
router.patch(
  '/avatars',
  authenticate,
  uploadMiddleware.single('avatar'),
  ctrl.updateAvatar
)

module.exports = router
