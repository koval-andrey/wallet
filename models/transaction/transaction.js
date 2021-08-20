onst mongoose = require('mongoose');

const { Schema } = mongoose;

const TYPES = {
  INCOME: '+',
  COST: '-',
};

const CATEGORIES = {}

const transactionSchema = new Schema()


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;