const mongoose = require('../config/db')
const Schema = mongoose.Schema

const FavoriteSchema = Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Favorite', FavoriteSchema)