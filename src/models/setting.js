const mongoose = require('../config/db')
const Schema = mongoose.Schema

const SettingSchema = Schema({

  type: {
    type: String,
    default: 'setting',
  },

  termsOfUse: {
    type: String
  },

  privacyPolicy: {
    type: String
  },

  aboutUs: {
    type: String
  },

  numberWhatsApp: {
    type: String
  },

  textWhatsApp: {
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

module.exports = mongoose.model('Setting', SettingSchema)