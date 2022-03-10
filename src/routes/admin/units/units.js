const auth = require('../../../config/auth')
const verifyProfile = require('../../../libs/verifyProfile')
const registerLog = require('../../../libs/registerLog')
const uploadPicture = require('../../../libs/uploadPictureCloud')
const uploadGallery = require('../../../libs/uploadGallery')

module.exports = (app) => {
  
  const unitController = app.controllers.units.unitController

  app.route('/:lng/admin/units')
    
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const query = req.query
      try {
        const result = await unitController.list(query);
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      
      const { 
        enterprise,
        description,
        meters,
        features,
        number,
        videoUrl,
        photos,
        rooms,
        suites,
        semissuites,
        garage,
        bathrooms,
        plant,
        price,
        percentageInput,
        percentageMonthly,
        percentageSemiannual,
        percentageKeys,
        interestRate,
        sold,
        tower,
        reserved,
        public,
        additionals
       } = req.body


      if (!enterprise) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const unit = {  enterprise,
        description,
        meters,
        features,
        number,
        videoUrl,
        photos,
        rooms,
        suites,
        semissuites,
        garage,
        bathrooms,
        plant,
        price,
        percentageInput,
        percentageMonthly,
        percentageSemiannual,
        percentageKeys,
        interestRate,
        sold,
        tower,
        reserved,
        public,
        additionals
       }


      if (plant) {
        const urlPicture = await uploadPicture(plant)
        unit.plant = urlPicture
      }


      if(photos){
        const gallery = await uploadGallery.upload(photos);
        unit.photos = gallery
      }
      
      if(features){
        unit.features = JSON.parse(features)
      }

      if(additionals){
        unit.additionals = JSON.parse(additionals)
      }


      try {
        const result = await unitController.create(unit)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicionou a unidade')}: "${result.data._id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      
      const { 
        _id,
        enterprise,
        description,
        meters,
        features,
        number,
        videoUrl,
        photos,
        rooms,
        suites,
        semissuites,
        garage,
        bathrooms,
        plant,
        price,
        percentageInput,
        percentageMonthly,
        percentageSemiannual,
        percentageKeys,
        interestRate,
        sold,
        tower,
        reserved,
        public,
        additionals
       } = req.body


      if (!_id || !enterprise) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const unit = {  
        _id,
        enterprise,
        description,
        meters,
        features,
        number,
        videoUrl,
        photos,
        rooms,
        suites,
        semissuites,
        garage,
        bathrooms,
        plant,
        price,
        percentageInput,
        percentageMonthly,
        percentageSemiannual,
        percentageKeys,
        interestRate,
        sold,
        tower,
        reserved,
        public,
        additionals
       }


      if (plant) {
        const urlPicture = await uploadPicture(plant)
        unit.plant = urlPicture
      }


      if(photos){
        const gallery = await uploadGallery.upload(photos);
        unit.photos = gallery
      }
      
      if(features){
        unit.features = JSON.parse(features)
      }

      if(additionals){
        unit.additionals = JSON.parse(additionals)
      }


      try {
        const result = await unitController.update(unit)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou a unidade')}: "${result.data._id}" na plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/units/:id')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const { id } = req.params
      try {
        const result = await unitController.show(id)
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
        const result = await unitController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu a unidade')}: "${id}" da plataforma.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}