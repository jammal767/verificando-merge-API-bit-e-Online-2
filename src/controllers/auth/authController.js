'use strict'
// Model user
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const hash = require('../../libs/hash')
const sendMail = require('../../libs/sendMail')

// Genarate new password
const generatePassword = () => {
  let id = ''
  while (id.length < 5) {
    id += Math.floor(Math.random() * 100)
  }
  return id
}

// Login normal
exports.loginNormal = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      email
    }, async (erro, user) => {
      if (!user) {
        const e = {
          error: true,
          code: 401,
          msg: __('Usuário não encontrado')
        }
        reject(e)
        return false
      } else {
        const comparePassword = await hash.compare(password, user.password)

        if (!comparePassword) {
          const e = {
            error: true,
            code: 401,
            msg: __('Login inválido.')
          }
          reject(e)
          return false
        }

        const token = jwt.sign({
          user_id: user._id,
          user_profile: user.profile
        }, process.env.JWT_SECRET)

        user.token = token
        user.password = undefined

        const result = {
          success: true,
          code: 200,
          data: user
        }
        resolve(result)
      }
    })
  })
}

// Login with facebook
exports.loginFB = (facebookId) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      facebookId
    }, (error, user) => {
      if (error) {
        const e = {
          error: true,
          code: 400,
          msg: error
        }
        reject(e)
        return false
      }

      if (!user) {
        const e = {
          error: true,
          code: 401,
          msg: __('Usuário não encontrado')
        }
        reject(e)
        return false
      } else {
        const token = jwt.sign({
          user_id: user._id,
          user_profile: user.profile
        }, process.env.JWT_SECRET)

        user.token = token
        user.password = undefined

        const result = {
          success: true,
          code: 200,
          data: user
        }
        resolve(result)
      }
    })
  })
}

// Login with Google
exports.loginGoogle = (googleId) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      googleId: googleId
    }, (error, user) => {
      if (error) {
        const e = {
          error: true,
          code: 400,
          msg: error
        }
        reject(e)
        return false
      }

      if (!user) {
        const e = {
          error: true,
          code: 401,
          msg: __('Usuário não encontrado.')
        }
        reject(e)
        return false
      } else {
        if (!user.active) {
          const e = {
            error: true,
            code: 401,
            msg: __('Sua conta está inativa. Entre em contato através do e-mail: contato@phast.com.br')
          }
          reject(e)
          return false
        }

        const token = jwt.sign({
          user_id: user._id,
          user_profile: user.profile
        }, process.env.JWT_SECRET)

        user.token = token
        user.password = undefined

        const result = {
          success: true,
          code: 200,
          data: user
        }
        resolve(result)
      }
    })
  })
}

// Remember password
exports.remember_password = (email) => {
  return new Promise((resolve, reject) => {
    const newPassword = generatePassword()
    hash.encrypt(newPassword).then(pwd => {
      User.findOneAndUpdate({
        email
      }, {
        password: pwd,
        updatedAt: new Date()
      }, async (erro, user) => {
        if (!user) {
          const e = {
            error: true,
            code: 400,
            msg: __('Usuário não encontrado.')
          }
          reject(e)
          return false
        }

        sendMail.send({
          emailTo: user.email,
          subject: __('Lembrete de Senha - RKM'),
          tamplateName: 'remember_password',
          params: {
            userName: user.name.split(' ')[0],
            password: newPassword
          }
        })

        const result = {
          userId: user._id,
          code: 200,
          success: true,
          msg: __('Enviamos um e-mail contendo uma nova senha.')
        }

        resolve(result)
      })
    })
  })
}