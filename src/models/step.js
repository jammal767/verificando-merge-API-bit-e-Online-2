const mongoose = require('../config/db')
const Schema = mongoose.Schema

const StepSchema = Schema({

  name: {
    type: String
  },

  description: {
    type: String
  },

  number: {
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

module.exports = mongoose.model('Step', StepSchema)