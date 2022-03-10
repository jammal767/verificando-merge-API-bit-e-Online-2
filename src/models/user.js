const mongoose = require('../config/db')
const Schema = mongoose.Schema

const UserSchema = Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: [/\S+@\S+\.\S/, __('email_invalid')]
  },

  avatar: {
    type: String
  },

  active: {
    type: Boolean,
    default: true
  },

  profile: {
    type: String,
    default: 'Client'
  },

  phone: {
    type: String
  },

  facebookId: {
    type: String
  },

  googleId: {
    type: String
  },

  password: {
    type: String
  },

  token: {
    type: String
  },

  loc: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d' // create the geospatial index
  },

  rolesAdmin: {
    type: Object
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

UserSchema.set('toJSON', { hide: 'password' })

UserSchema.pre('remove', function (next) {
  mongoose.model('Log').deleteMany({ user: this._id }, next);
  mongoose.model('Favorite').deleteMany({ user: this._id }, next);
  mongoose.model('Rating').deleteMany({ user: this._id }, next);
  mongoose.model('Schedule').deleteMany({ user: this._id }, next);
  mongoose.model('Simulation').deleteMany({ user: this._id }, next);
  mongoose.model('Document').deleteMany({ user: this._id }, next);
  next();
});

module.exports = mongoose.model('User', UserSchema)