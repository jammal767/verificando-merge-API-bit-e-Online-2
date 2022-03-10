const Type = require('type-of-is')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = (picture) => {
  return new Promise((resolve, reject) => {
    if (Type(picture, Object)) {
      resolve(picture.url)
    } else {
      const tipo = picture.slice(0, 4)
      if (tipo === 'http') {
        resolve(picture)
      }
      cloudinary.uploader.upload(picture, (result) => {
        // console.log(result)
        resolve(result.secure_url)
      }, {
        format: 'png',
        quality: 70
      })
    }
  })
}