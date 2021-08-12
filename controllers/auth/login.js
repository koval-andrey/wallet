const jwt = require('jsonwebtoken')
require('dotenv')
const { User: service } = require('../../services')

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })
    if (!user || !user.comparePassword(password) || !user.varify) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'incorrect email or password'
      })
      return
    }
    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY)
    await service.updateById(user._id, { token })
    res.json({
      status: 'success',
      code: 200,
      data: { result: token }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
