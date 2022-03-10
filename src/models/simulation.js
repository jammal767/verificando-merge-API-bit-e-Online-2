const mongoose = require('../config/db')
const Schema = mongoose.Schema

const SimulationSchema = Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    require: false
  },

  results: {
    type: Object
  },

  step: {
    type: String,
    default: '1'
  },

  proposal: {
    type: String
  },

  complete: {
    type: Boolean,
    default: false
  },

  canceled: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Simulation', SimulationSchema)