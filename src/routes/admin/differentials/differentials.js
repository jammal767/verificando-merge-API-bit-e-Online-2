const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')
const uploadPicture = require('../../../libs/uploadPictureCloud')


module.exports = (app) => {
  
    const differentialController = app.controllers.differentials.differentialController

  app.route('/:lng/admin/differentials')
    .get(auth, async (req, res) => {
      try {
        const result = await differentialController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { icon, description } = req.body

      if (!description) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const newDifferential = {
        icon,
        description
      }

      if (icon) {
        const urlPicture = await uploadPicture(icon)
        newDifferential.icon = urlPicture
      }

      try {
        const result = await differentialController.create(newDifferential)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou a diferencial')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { _id, icon, description } = req.body

      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const editDifferential = {
        _id: _id,
        icon: icon,
        description: description
      }

      if (icon) {
        const urlPicture = await uploadPicture(icon)
        editDifferential.icon = urlPicture
      }

      try {
        const result = await differentialController.update(editDifferential)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou o diferencial')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/differentials/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await differentialController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .delete(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { id } = req.params
      if (!id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      try {
        const result = await differentialController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu o diferencial')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}