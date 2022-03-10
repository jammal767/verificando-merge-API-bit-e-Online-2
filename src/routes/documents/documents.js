const auth = require('../../config/auth')
const registerLog = require('../../libs/registerLog')
const uploadPicture = require('../../libs/uploadPictureCloud')
const CPF = require('cpf_cnpj').CPF

module.exports = (app) => {

  const documentController = app.controllers.documents.documentController


  app.route('/:lng/documents/simulation/:simulationId')
    .get(auth, async (req, res) => {

      let simulationId = req.params.simulationId;
      let userId = req.decoded.user_id;

      try {
        const result = await documentController.showSimulationDocuments(simulationId, userId)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/documents')
    .get(auth, async (req, res) => {
      let userId = req.decoded.user_id;
      try {
        const result = await documentController.showUserDocument(userId)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .post(auth, async (req, res) => {

      const {
        simulation,
        fullname,
        email,
        married,
        single,
        spouseFullName,
        spouseRG,
        spouseCPF,
        rg,
        cpf,
        address,
        number,
        cep,
        city,
        district,
        country,
        birthday,
        spouseBirthday,
        state } = req.body


      if (!fullname || !email || !rg || !cpf) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }


      if (!CPF.isValid(cpf)) {
        res.status(422).json({
          error: true,
          code: 400,
          msg: __('CPF Inválido')
        })
        return false
      }


      if (spouseCPF && !CPF.isValid(spouseCPF)) {
        res.status(422).json({
          error: true,
          code: 400,
          msg: __('CPF Cônjuge Inválido')
        })
        return false
      }

      const newDocument = {
        user: req.decoded.user_id,
        simulation,
        fullname,
        email,
        married,
        single,
        spouseFullName,
        spouseRG,
        spouseCPF,
        rg,
        cpf,
        address,
        number,
        cep,
        city,
        district,
        country,
        birthday,
        spouseBirthday,
        state,
      }

      try {
        const result = await documentController.create(newDocument)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Adicinou uma documentação na plataforma')}`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, async (req, res) => {
      const {
        _id,
        simulation,
        fullname,
        email,
        married,
        single,
        spouseFullName,
        spouseRG,
        spouseCPF,
        rg,
        cpf,
        address,
        number,
        addressComplement,
        cep,
        city,
        district,
        country,
        state,
        birthday,
        spouseBirthday,
        photoRGFront,
        photoRGBack,
        photoUserRg,
        photoCPF,
        photoAddress,
        photoCertificate,
        selfPhotoSmile,
        selfPhotoWithDocument,
        selfPhotoNormal,
        contractSignature
      } = req.body


      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      if (cpf && !CPF.isValid(cpf)) {
        res.status(422).json({
          error: true,
          code: 400,
          msg: __('CPF Inválido')
        })
        return false
      }


      const editDocument = {
        _id,
        user: req.decoded.user_id,
        simulation,
        fullname,
        email,
        married,
        single,
        spouseFullName,
        spouseRG,
        spouseCPF,
        rg,
        cpf,
        address,
        number,
        addressComplement,
        cep,
        city,
        district,
        country,
        state,
        birthday,
        spouseBirthday,
        photoRGFront,
        photoRGBack,
        photoUserRg,
        photoCPF,
        photoAddress,
        photoCertificate,
        selfPhotoSmile,
        selfPhotoWithDocument,
        selfPhotoNormal,
        contractSignature
      }

      try {
        const result = await documentController.update(editDocument);
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Editou os dados da documentação')}`);
          res.status(result.code).send(result);
        }
      } catch (error) {
        res.status(error.code).send(error);
      }
    })

  app.route('/:lng/documents/:id')
    .get(auth, async (req, res) => {
      const { id } = req.params
      try {
        const result = await documentController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .delete(auth, async (req, res) => {
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
        const result = await documentController.delete(id)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Removeu a documentação')}.`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}