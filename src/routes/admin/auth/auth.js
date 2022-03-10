const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {
  const authController = app.controllers.auth.authController

  app.route('/:lng/admin/auth')

    .post(async (req, res) => {
      const {
        email,
        password,
        deviceId
      } = req.body

      // Validate fields
      if (!email) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Informe o seu e-mail.')
        })
        return false
      }

      if (!password) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Digite sua senha')
        })
        return false
      }

      try {
        const result = await authController.loginNormal(email, password, deviceId)
        if (result.success && result.data.profile === 'Admin') {
          registerLog(result.data._id, __('login'))
          res.status(result.code).send(result)
        }else{
          res.status(401).json({
            error: true,
            code: 401,
            msg: __('Login incorreto.')
          })
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

}