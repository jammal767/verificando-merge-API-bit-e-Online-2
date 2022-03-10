const mongoose = require('../config/db')
const encrypt = require('mongoose-encryption');
const Schema = mongoose.Schema

const DocumentSchema = Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    simulation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Simulation'
    },

    fullname: {
        type: String
    },

    email: {
        type: String
    },

    married: {
        type: Boolean,
        default: false
    },

    approve: {
        type: Boolean,
        default: false
    },

    reasonRepprove: {
        type: String,
        default: ''
    },

    single: {
        type: Boolean,
        default: false
    },

    spouseFullName: {
        type: String
    },

    spouseRG: {
        type: String
    },

    spouseCPF: {
        type: String
    },

    birthday: {
        type: String
    },

    spouseBirthday: {
        type: String
    },

    rg: {
        type: String
    },

    cpf: {
        type: String
    },

    address: {
        type: String
    },

    number: {
        type: String
    },

    addressComplement: {
        type: String
    },

    cep: {
        type: String
    },

    city: {
        type: String
    },

    district: {
        type: String
    },

    country: {
        type: String
    },

    state: {
        type: String
    },

    photoRGFront: {
        type: String
    },

    photoRGBack: {
        type: String
    },

    photoUserRg: {
        type: String
    },
    photoCPF: {
        type: String
    },

    photoAddress: {
        type: String
    },

    photoCertificate: {
        type: String
    },

    selfPhotoSmile: {
        type: String
    },

    selfPhotoWithDocument: {
        type: String
    },

    selfPhotoNormal: {
        type: String
    },

    contractContent: {
        type: String
    },

    contractSignature: {
        type: String
    },

    contractPdf: {
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

DocumentSchema.plugin(encrypt, { secret: process.env.JWT_SECRET, excludeFromEncryption: ['user', 'simulation'] });

module.exports = mongoose.model('Document', DocumentSchema)