const { Schema } = require('mongoose')
const contactSchema = Schema(
  {
    name: {
      type: String,
      minlength: [1, 'The name must contain at least 1 letter'],
      required: [true, 'Name must be specified'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: 'Email address is required'

    },
    phone: {
      type: String,
      unique: true,
      required: 'Number phone is required'
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

module.exports = contactSchema
