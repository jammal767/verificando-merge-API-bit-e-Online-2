const auth = require('../../../config/auth')
const uploadPicture = require('../../../libs/uploadPictureCloud')
const hash = require('../../../libs/hash')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {
  const userController = app.controllers.users.userController

  app.route('/:lng/admin/users')

    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const query = req.query
      query.profile = 'Admin'
      try {
        const result = await userController.list(query)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const {
        name,
        email,
        password,
        avatar,
        rolesAdmin
      } = req.body

      if (!name || !email || !password) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const pwd = await hash.encrypt(password)

      const user = {
        name: name,
        email: email,
        avatar: avatar,
        rolesAdmin: rolesAdmin,
        profile: 'Admin',
        password: pwd
      }

      if (avatar) {
        const urlPicture = await uploadPicture(avatar)
        user.avatar = urlPicture
      }

      try {
        const result = await userController.create(user)
        if (result.success) {
          
          registerLog(req.decoded.user_id, `${__('Adicionou um novo administrador')}: "${result.data.name}" na plataforma.`);
          res.status(result.code).send(result)
          
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const {
        _id,
        name,
        email,
        password,
        avatar,
        rolesAdmin
      } = req.body

      if (!name || !email) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const user = {
        _id,
        name,
        email,
        password,
        avatar,
        rolesAdmin
      }

      if (avatar) {
        const urlPicture = await uploadPicture(avatar)
        user.avatar = urlPicture
      }

      try {
        const result = await userController.update(user)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou os dados do')} "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


  app.route('/:lng/admin/users/:id')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
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

    .delete(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { id } = req.params

      try {
        const result = await userController.delete(id, req.decoded.user_id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu o usuário com id')}: "${id}" da plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

}