const { user: service } = require('../../services')
const { nanoid } = require('nanoid')
const { mailNodemailer } = require('../../utils')

const verifyEmail = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await service.getOne({ email })
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'error',
      })
    }
    if (user.verify) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'error',
      })
    }
    if (!user.verifyToken) {
      const verifyToken = nanoid()
      await service.updateById(user._id, { verifyToken })
    }
    const mail = {
      to: email,
      text: 'check your email'
    }
    await mailNodemailer(mail)
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'success',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verifyEmail
