const mongoose = require('../config/db')
const Schema = mongoose.Schema

const LogSchema = Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  description: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Log', LogSchema)