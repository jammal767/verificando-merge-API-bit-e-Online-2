const mongoose = require('../config/db')
const Schema = mongoose.Schema


const Differential = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Differential'
}

const EnterpriseSchema = Schema({

  name: {
    type: String
  },

  draft: {
    type: String
  },

  description: {
    type: String
  },

  logo: {
    type: String
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  photos: {
    type: Array
  },

  differentials: [Differential],

  hotsiteUrl: {
    type: String
  },

  bookUrl: {
    type: String
  },

  tourVirtualUrl: {
    type: String
  },

  loc: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d' // create the geospatial index
  },

  address: {
    type: String
  },

  state: {
    type: String
  },

  status: {
    type: String
  },

  country: {
    type: String
  },

  city: {
    type: String
  },

  public: {
    type: Boolean,
    default: false
  },

  start: {
    type: Date,
    timezone: 'America/Sao_Paulo'
  },

  end: {
    type: Date,
    timezone: 'America/Sao_Paulo'
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

module.exports = mongoose.model('Enterprise', EnterpriseSchema)