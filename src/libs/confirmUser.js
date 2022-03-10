module.exports = (user, req) => {
  return new Promise((resolve, reject) => {
    if (user !== req.decoded.user_id) {
      resolve(false)
    } else {
      resolve(true)
    }
  })
}