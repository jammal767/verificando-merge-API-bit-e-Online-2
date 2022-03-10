const Log = require('../models/log')

module.exports = (user, description) => {
  var log = {
    user: user,
    description: description
  }

  new Log(log).save()
}