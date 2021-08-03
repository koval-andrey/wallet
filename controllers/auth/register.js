const { User: service } = require('../../services')

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
    const user = await service.add({ email, password })
    const userInfo = {
      email: user.email,
      subscription: user.subscription,
      avatarUrl: user.avatarUrl,
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
