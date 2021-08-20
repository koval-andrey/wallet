const { user: service } = require('../../services')
const nanoid = require('nanoid')
const verifyToken = nanoid()
const register = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const result = await service.getOne({ email })
    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'already register'
      })
      return
    }
    const user = await service.add({ email, password, verifyToken })
    const userInfo = {
      email: user.email,
      subscription: user.subscription,

    }
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { user: userInfo },
      message: 'success'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
