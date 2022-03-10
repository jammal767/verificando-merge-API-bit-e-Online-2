const auth = require('../../config/auth')
const uploadPicture = require('../../libs/uploadPictureCloud')
const hash = require('../../libs/hash')
const registerLog = require('../../libs/registerLog')

module.exports = (app) => {
  const userController = app.controllers.users.userController

  app.route('/:lng/users')

    .post(async (req, res) => {
      const { name, email, avatar, facebookId, googleId, password, phone, lat, lng } = req.body

      if (!name || !email || !password) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Preencha o campo obrigatório.')
        })
        return false
      }

      const loc = [lat || 0, lng || 0]
      const pwd = await hash.encrypt(password)

      const user = {
        name: name,
        email: email,
        avatar: avatar,
        phone: phone,
        facebookId: facebookId,
        googleId: googleId,
        password: pwd,
        loc: loc
      }

      if (avatar) {
        const urlPicture = await uploadPicture(avatar)
        user.avatar = urlPicture
      }

      try {
        const result = await userController.create(user)
        if (result.success) {
          res.status(result.code).send(result)
          registerLog(result.data._id, __('Criou uma conta no app.'))
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, async (req, res) => {
      const { _id, name, email, avatar, lat, phone, lng } = req.body

      if (!name || !email) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Preencha o campo obrigatório.')
        })
        return false
      }

      const loc = [lat || 0, lng || 0]

      const user = {
        _id: _id,
        name: name,
        email: email,
        avatar: avatar,
        phone: phone,
        loc: loc
      }

      if (avatar) {
        const urlPicture = await uploadPicture(avatar)
        user.avatar = urlPicture
      }

      try {
        const result = await userController.update(user)
        if (result.success) {
          res.status(result.code).send(result)
          registerLog(result.data._id, __('Alterou seus dados na plataforma.'))
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .delete(auth, async (req, res) => {
      const { id } = req.body
      if (!id) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Preencha o campo obrigatório.')
        })
        return false
      }

      try {
        const result = await userController.delete(id, req.decoded.user_id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/users/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await userController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/users/update_password')
    .put(auth, async (req, res) => {
      const id = req.decoded.user_id

      const {
        senhaAtual,
        novaSenha
      } = req.body

      if (!id || !senhaAtual || !novaSenha) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('Preencha o campo obrigatório.')
        })
        return
      }


      const newPwd = await hash.encrypt(novaSenha)

      try {
        const result = await userController.edit_password(id, senhaAtual, newPwd)
        if (result.success) {
          res.status(result.code).send(result)
          registerLog(id, __('Alterou a senha no app.'))
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}