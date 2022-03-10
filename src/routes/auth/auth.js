const registerLog = require('../../libs/registerLog')

module.exports = (app) => {
  const authController = app.controllers.auth.authController

  app.route('/:lng/auth')

    .post(async (req, res) => {
      const {
        email,
        password,
        deviceId
      } = req.body

      // Validate fields
      if (!email) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Digite o seu e-mail.')
        })
        return false
      }

      if (!password) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Digite sua senha.')
        })
        return false
      }

      try {
        const result = await authController.loginNormal(email, password, deviceId)
        if (result.success) {
          res.status(result.code).send(result)
          registerLog(result.data._id, __('Realizou login no app com o email.'))
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/auth/fb')
    .post(async (req, res) => {
      const facebookId = req.body.facebookId

      if (!facebookId) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Facebook ID é obrigatório.')
        })
        return false
      }

      try {
        const result = await authController.loginFB(facebookId)
        if (result.success) {
          res.status(result.code).send(result)
          registerLog(result.data._id, __('Acessou a plataforma utilizando o Facebook.'))
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/auth/google')
    .post(async (req, res) => {
      const googleId = req.body.googleId

      if (!googleId) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('O Google ID é obrigatório.')
        })
        return false
      }

      try {
        const result = await authController.loginGoogle(googleId)
        if (result.success) {
          res.status(result.code).send(result)
          registerLog(result.data._id, __('Acessou a plataforma utilizando o Google.'))
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/auth/remember_password')
    .post(async (req, res) => {
      const {
        email
      } = req.body
      try {
        const result = await authController.remember_password(email)
        if (result.success) {
          registerLog(result.userId, __('Solicitou um lembrete de senha.'))
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}