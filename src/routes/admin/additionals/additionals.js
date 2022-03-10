const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')
const uploadGallery = require('../../../libs/uploadGallery')

module.exports = (app) => {
  
  const additionalController = app.controllers.additionals.additionalController

  app.route('/:lng/admin/additionals')
    
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      
      try {
        const result = await additionalController.list();
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
        description,
        photos,
       } = req.body


       if (!name || !description) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Os campos nome e descrição são obrigatórios.')
        })
        return false
      }

      const unit = {
        name,
        description,
        photos,
        }


      if(photos){
        const gallery = await uploadGallery.upload(photos);
        unit.photos = gallery
      }

      try {
        const result = await additionalController.create(unit)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou o adicional')}: "${result.data._id}" na plataforma.`)
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
        description,
        photos
       } = req.body


      if (!_id || !name || !description) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Os campos _id, nome e descrição são obrigatórios.')
        })
        return false
      }


      const unit = {  
        _id,
        name,
        description,
        photos,
      }


      if(photos){
        const gallery = await uploadGallery.upload(photos);
        unit.photos = gallery
      }

      try {
        const result = await additionalController.update(unit)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou o adicional')}: "${result.data._id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/additionals/:id')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { id } = req.params
      try {
        const result = await additionalController.show(id)
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
        const result = await additionalController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu o adicional')}: "${id}" da plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}