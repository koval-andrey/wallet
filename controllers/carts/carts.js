const { cart: service } = require('../')

const getAll = async (req, res, next) => {
  const { _id } = req.user
  try {
    const result = await service.getOne({ userId: _id })
  } catch (error) {
    next(error)
  }
}
