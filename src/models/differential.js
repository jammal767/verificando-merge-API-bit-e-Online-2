const mongoose = require('../config/db')
const Schema = mongoose.Schema

const DifferentialSchema = Schema({

  icon: {
    type: String
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

module.exports = mongoose.model('Differential', DifferentialSchema)