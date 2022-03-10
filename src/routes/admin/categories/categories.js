const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')

module.exports = (app) => {
  
    const categoryController = app.controllers.categories.categoryController

  app.route('/:lng/admin/categories')
    .get(auth, async (req, res) => {
      try {
        const result = await categoryController.list()
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { name, description } = req.body

      if (!name) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const newCategory = {
        name,
        description
      }

      try {
        const result = await categoryController.create(newCategory)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou a categoria')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { _id, name, description } = req.body

      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const editCategory = {
        _id: _id,
        name: name,
        description: description
      }

      try {
        const result = await categoryController.update(editCategory)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou a categoria')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/categories/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await categoryController.show(id)
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
        const result = await categoryController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu a categoria')}: "${id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}