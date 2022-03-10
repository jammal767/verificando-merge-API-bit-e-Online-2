const User = require('../models/user')

module.exports = (_id) => {
  return new Promise((resolve, reject) => {
    User.findById(_id, (error, user) => {
      if (error) {
        console.log(error)
      }
      let result = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        deviceId: user.deviceId
      }
      resolve(result)
    })
  })
}