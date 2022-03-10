const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')
const uploadPicture = require('../../../libs/uploadPictureCloud')
const uploadGallery = require('../../../libs/uploadGallery')

module.exports = (app) => {
  const enterpriseController = app.controllers.enterprises.enterpriseController

  app.route('/:lng/admin/enterprises')

    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const query = req.query
      try {
        const result = await enterpriseController.listAll(query);
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {

      const { name, draft, description, logo, category, differentials, hotsiteUrl, bookUrl, tourVirtualUrl, photos, latitude, longitude, address, state, country, city, public, start, end, status } = req.body

      const loc = [latitude || 0, longitude || 0]

      if (!name || !draft || !description || !category) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const enterprise = { name, draft, description, logo, category, differentials, hotsiteUrl, tourVirtualUrl, photos, bookUrl, loc, address, state, country, city, public, start, end, status }


      if (logo) {
        const urlPicture = await uploadPicture(logo)
        enterprise.logo = urlPicture
      }


      if (photos) {
        const gallery = await uploadGallery.upload(photos);
        enterprise.photos = gallery
      }

      if (differentials) {
        enterprise.differentials = JSON.parse(differentials)
      }

      enterprise.start = new Date(`${start} 15:00`);
      enterprise.end = new Date(`${end} 15:00`);

      try {
        const result = await enterpriseController.create(enterprise)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou o empreendimento')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {

      const { _id, name, draft, description, logo, category, differentials, hotsiteUrl, tourVirtualUrl, bookUrl, photos, latitude, longitude, address, state, country, city, public, start, end, status } = req.body

      const loc = [latitude || 0, longitude || 0]

      if (!name || !draft || !description || !category) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const enterprise = { _id, name, draft, description, logo, category, differentials, hotsiteUrl, tourVirtualUrl, photos, bookUrl, loc, address, state, country, city, public, start, end, status }

      if (logo) {
        const urlPicture = await uploadPicture(logo)
        enterprise.logo = urlPicture
      }

      if (photos) {
        const gallery = await uploadGallery.upload(photos);
        enterprise.photos = gallery
      }

      if (differentials) {
        enterprise.differentials = JSON.parse(differentials)
      }


      try {
        const result = await enterpriseController.update(enterprise)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou o empreendimento')}: "${result.data.name}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/enterprises/:id')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { id } = req.params
      try {
        const result = await enterpriseController.show(id)
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
        const result = await enterpriseController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu o empreendimento')}: "${id}" da plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}