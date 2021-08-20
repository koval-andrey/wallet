const mongoose = require('mongoose')

const { Schema } = mongoose

const walletSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    costs: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const Wallet = mongoose.model('Wallet', walletSchema)

module.exports = Wallet
