const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnticipateSchema = Schema({

  question: {
    type: String
  },

  response: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now,
    timezone: 'America/Sao_Paulo'
  },

  updatedAt: {
    type: Date,
    timezone: 'America/Sao_Paulo'
  }
})

module.exports = mongoose.model('anticipate', AnticipateSchema)