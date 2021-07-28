const { User } = require('../model/user')

const getById = (id) => User.findById(id)

const getOne = (filter) => {
  return User.findOne(filter)
}

const add = ({ email, password }) => {
  const newUser = new User({ email })
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo)
}

module.exports = {
  getById,
  getOne,
  add,
  updateById
}
