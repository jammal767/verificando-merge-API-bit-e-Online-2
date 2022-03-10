const mongoose = require('../config/db')
const Schema = mongoose.Schema

const RatingSchema = Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  simulation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Simulation'
  },

  score: {
    type: String
  },

  justification: {
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

module.exports = mongoose.model('Rating', RatingSchema)