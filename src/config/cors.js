module.exports = (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '127.0.0.1')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, JPEG, JPG, PNG, GIF, PDF')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}