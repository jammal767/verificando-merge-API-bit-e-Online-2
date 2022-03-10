const bcrypt = require('bcryptjs')
const saltRounds = 8

exports.encrypt = (pwd) => {
  return bcrypt.hash(pwd, saltRounds)
}

exports.compare = (pwd, hash) => {
  return bcrypt.compare(pwd, hash)
}