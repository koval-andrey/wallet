
const path = require('path')
const fs = require('fs/promises')
const jimp = require('jimp')

// const { v4 } = require("uuid");
// const { user: service } = require('../../services')

const updateAvatar = async (req, res, next) => {
  const uploadDir = path.join(process.cwd(), 'puplic/avatars')
  const { path: tempName, originalname } = req.file
  const fileName = path.join(uploadDir, originalname)
  try {
    const avatar = await jimp.read(tempName)
    await avatar.autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    await fs.rename(tempName, fileName)
  } catch {
    fs.unlink(tempName)
    next()
  }
}

module.exports = updateAvatar
