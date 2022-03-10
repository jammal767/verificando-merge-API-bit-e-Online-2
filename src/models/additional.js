const mongoose = require('../config/db')
const Schema = mongoose.Schema

const AdditionalSchema = Schema({

    name: {
        type: String
    },

    description: {
        type: String
    },

    photos: {
        type: Array
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model('Additional', AdditionalSchema)