const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'koval_andrey1234@meta.ua',
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)
const mail = {
  from: 'koval_andrey1234@meta.ua',
  to: 'kovalandrey1234@gmail.com',
  subject: 'test mail',
  text: 'Hello world!'
}

transporter.sendMail(mail)
  .then(info => console.log(info))
  .catch(error => console.log(error))

module.exports = transporter
