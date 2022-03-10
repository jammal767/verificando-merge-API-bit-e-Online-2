const mongoose = require('../config/db')
const Schema = mongoose.Schema

const ScheduleSchema = Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  },

  status: {
    type: String,
    default: 'open' //open, cancel and done
  },

  date: {
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

module.exports = mongoose.model('Schedule', ScheduleSchema)