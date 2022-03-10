const mongoose = require('../config/db')
const Schema = mongoose.Schema


const Additional = Schema({

  additional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Additional'
  },
  name: {
    type: String
  },
  price: {
    type: String
  }

});

const UnitSchema = Schema({

  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise'
  },

  description: {
    type: String
  },

  meters: {
    type: Number,
    default: 0
  },

  features: {
    type: Array
  },

  number: {
    type: String,
  },

  videoUrl: {
    type: String
  },
  
  photos: {
    type: Array
  },

  additionals: [Additional],

  rooms: {
    type: Number,
    default: 0
  },

  suites: {
    type: Number,
    default: 0
  },

  semissuites: {
    type: Number,
    default: 0
  },

  garage: {
    type: Number,
    default: 0
  },

  bathrooms:{
    type: Number,
    default: 0
  },

  plant: {
    type: String
  },

  price: {
    type: String
  },

  percentageInput: {
    type: Number,
    default: 0
  },

  percentageMonthly: {
    type: Number,
    default: 0
  },

  percentageSemiannual: {
    type: Number,
    default: 0
  },

  percentageKeys: {
    type: Number,
    default: 0
  },

  interestRate: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date
  },
  sold: {
    type: Boolean,
    default: false
  },
  public: {
    type: Boolean,
    default: false
  },
  reserved: {
    type: Boolean,
    default: false
  },
  tower:{
    type: String
  }


})

module.exports = mongoose.model('Unit', UnitSchema)