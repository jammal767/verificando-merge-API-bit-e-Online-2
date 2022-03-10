const auth = require('../../../config/auth')
const registerLog = require('../../../libs/registerLog')
const verifyProfile = require('../../../libs/verifyProfile')
const Sales = require('../../../modules/sales');
const Contract = require('../../../modules/contract')
const fs = require('fs');
const path = require('path');


module.exports = (app) => {

  const documentController = app.controllers.documents.documentController

  app.route('/:lng/admin/documents/simulation/:simulationId')
    .get(auth, verifyProfile.allow(['Admin']), async (req, res) => {

      let { simulationId } = req.params;

      try {
        const result = await documentController.showDocumentSimulationId(simulationId)

        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


  app.route('/:lng/admin/documents/disapprove')
    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const {
        _id,
        photoRGFront,
        photoRGBack,
        photoUserRg,
        photoCPF,
        photoAddress,
        photoCertificate,
        selfPhotoSmile,
        selfPhotoWithDocument,
        selfPhotoNormal,
        reasonRepprove,
      } = req.body

      if (!_id) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const editDocument = {
        _id,
        photoRGFront,
        photoRGBack,
        photoUserRg,
        photoCPF,
        photoAddress,
        photoCertificate,
        selfPhotoSmile,
        selfPhotoWithDocument,
        selfPhotoNormal,
        reasonRepprove
      }

      try {
        const result = await documentController.update(editDocument)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Reprovou uma das imagens enviadas pelo cliente:')} ${result.data.fullname}`)
          Sales.repproveDocsNotify({ simulationId: result.data.simulation, reasonRepprove: result.data.reasonRepprove });
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })


  // app.route('/:lng/admin/documents/approve')
  //   .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
  //     const {
  //       _id,
  //     } = req.body

  //     if (!_id) {
  //       res.status(422).json({
  //         error: true,
  //         code: 422,
  //         msg: __('Campo obrigatório')
  //       })
  //       return false
  //     }

  //     const contractContent = await Contract.generateContent({ documentId: _id });

  //     const editDocument = {
  //       _id,
  //       approve: true,
  //       contractContent
  //     }

  //     try {
  //       const result = await documentController.update(editDocument)
  //       registerLog(req.decoded.user_id, `${__('Aprovou uma documentação do cliente:')} ${result.data.fullname}`)
  //       res.status(result.code).send(result)
  //     } catch (error) {
  //       res.status(error.code).send(error)
  //     }
  //   })

  app.route('/:lng/admin/documents/contract_review')
    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const {
        _id,
        contractContent
      } = req.body

      if (!_id || !contractContent) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      const editDocument = {
        _id,
        contractContent
      }

      try {
        const result = await documentController.update(editDocument)
        if (result.success) {
          registerLog(req.decoded.user_id, `${__('Realizou a revisão do contrato do(a) ')}${result.data.fullname}`)
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/admin/documents/contract/generate/pdf')
    .put(auth, verifyProfile.allow(['Admin']), async (req, res) => {
      const {
        simulationId,
      } = req.body

      if (!simulationId) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Campo obrigatório')
        })
        return false
      }

      try {
        Contract.generatePDF({ simulationId: simulationId, sendMail: true });
        res.status(200).send({ success: true, msg: __("Geramos um PDF do contrato e enviamos para o cliente") })

      } catch (error) {
        res.status(402).send({ error: true, msg: __("Falha ao gerar o PDF.") })
      }
    })

  app.route('/:lng/admin/documents/contract/pdf/:documentId')
    .get(auth, async (req, res) => {
      const {
        documentId,
      } = req.params

      if (!documentId) {
        res.status(422).json({
          error: true,
          code: 422,
          msg: __('Informe o Id da documentação')
        })
        return false
      }

      let filePath = `${path.dirname(require.main.filename)}/src/storage/contracts/${documentId}.pdf`;

      fs.readFile(filePath, function (err, data) {

        if (err) {
          res.status(402).send({ error: true, msg: __("Falha ao carregar o PDF.") })
          return;
        }

        res.contentType("application/pdf");
        res.send(data);
      });

    })
}