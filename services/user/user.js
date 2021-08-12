const { model } = require('mongoose')
const userSchema = require('./schemas')
const gravatar = require('gravatar')

const User = model('user', userSchema)

const getOne = (filter) => {
  return User.findOne(filter)
}
const add = ({ email, password, verifyToken }) => {
  const avatarUrl = gravatar.url(email)
  const newUser = new User({ email, avatarUrl, verifyToken })
  newUser.setPassword(password)
  return newUser.save()
}
const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo, { new: true })
}

module.exports = { User, getOne, add, updateById }
