const { user: service } = require('../../services')


const verify = async (req, res, next) => {
  const { verifyToken } = req.params
  try {
    const result = await service.getOne({ verifyToken })
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Your verification token is not valid',
      })
    }
    await service.updateById(user._id, { verify: true, verifyToken: '', })

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'success',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verify
