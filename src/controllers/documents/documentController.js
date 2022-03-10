const Document = require('../../models/document')

// List All Documents
exports.showUserDocument = (userId) => {
  return new Promise((resolve, reject) => {
    Document.findOne({ user: userId }, async (err, documents) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_documents')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: documents
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}


// Show Simulation and User Documents
exports.showSimulationDocuments = (simulationId, userId) => {
  return new Promise((resolve, reject) => {
    Document.findOne({ simulation: simulationId, user: userId }, async (err, documents) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao recuperar documentos')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: documents
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}

// Show Simulation Documents
exports.showDocumentSimulationId = (simulationId) => {
  return new Promise((resolve, reject) => {
    Document.findOne({ simulation: simulationId }, async (err, documents) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao recuperar documentos')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: documents
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}


// Create document
exports.create = (document) => {
  return new Promise((resolve, reject) => {
    new Document(document).save((err, document) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar a documentação')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Documentação adicionada com sucesso.'),
        data: document
      }
      return resolve(result)
    })
  })
}

// Show Document
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Document.findById(id, (err, document) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados da documentação.')
        }
        reject(e)
        return false
      }

      if (!document) {
        const e = {
          error: true,
          code: 400,
          msg: __('Documentação não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: document
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editDocument) => {
  return new Promise((resolve, reject) => {
    Document.findById(editDocument._id, (err, document) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do documentação.')
        }
        reject(e)
        return false
      }

      if (!document) {
        const e = {
          error: true,
          code: 400,
          msg: __('Documentação não encontrado.')
        }
        reject(e)
        return false
      }

      if (editDocument.fullname) {
        document.fullname = editDocument.fullname
      }

      if (editDocument.email) {
        document.email = editDocument.email
      }

      if (editDocument.married) {
        document.married = editDocument.married
      }

      if (editDocument.single) {
        document.single = editDocument.single
      }

      if (editDocument.spouseFullName) {
        document.spouseFullName = editDocument.spouseFullName
      }

      if (editDocument.spouseRG) {
        document.spouseRG = editDocument.spouseRG
      }

      if (editDocument.spouseCPF) {
        document.spouseCPF = editDocument.spouseCPF
      }

      if (editDocument.rg) {
        document.rg = editDocument.rg
      }

      if (editDocument.cpf) {
        document.cpf = editDocument.cpf
      }

      if (editDocument.address) {
        document.address = editDocument.address
      }

      if (editDocument.number) {
        document.number = editDocument.number
      }

      if (editDocument.addressComplement != null) {
        document.addressComplement = editDocument.addressComplement;
      }

      if (editDocument.cep) {
        document.cep = editDocument.cep
      }

      if (editDocument.city) {
        document.city = editDocument.city
      }

      if (editDocument.district) {
        document.district = editDocument.district
      }

      if (editDocument.country) {
        document.country = editDocument.country
      }

      if (editDocument.state) {
        document.state = editDocument.state
      }

      if (editDocument.photoRGFront) {
        document.photoRGFront = editDocument.photoRGFront
      }

      if (editDocument.photoRGBack) {
        document.photoRGBack = editDocument.photoRGBack
      }

      if (editDocument.photoUserRg) {
        document.photoUserRg = editDocument.photoUserRg
      }

      if (editDocument.photoCPF) {
        document.photoCPF = editDocument.photoCPF
      }

      if (editDocument.photoAddress) {
        document.photoAddress = editDocument.photoAddress
      }

      if (editDocument.photoCertificate) {
        document.photoCertificate = editDocument.photoCertificate
      }

      if (editDocument.selfPhotoSmile) {
        document.selfPhotoSmile = editDocument.selfPhotoSmile
      }

      if (editDocument.selfPhotoWithDocument) {
        document.selfPhotoWithDocument = editDocument.selfPhotoWithDocument
      }

      if (editDocument.selfPhotoNormal) {
        document.selfPhotoNormal = editDocument.selfPhotoNormal
      }

      if (editDocument.reasonRepprove) {
        document.reasonRepprove = editDocument.reasonRepprove
      }

      if (editDocument.approve) {
        document.approve = editDocument.approve
      }

      if (editDocument.birthday) {
        document.birthday = editDocument.birthday
      }

      if (editDocument.spouseBirthday) {
        document.spouseBirthday = editDocument.spouseBirthday
      }

      if (editDocument.contractContent) {
        document.contractContent = editDocument.contractContent
      }

      if (editDocument.contractSignature) {
        document.contractSignature = editDocument.contractSignature
      }

      if (editDocument.contractPdf) {
        document.contractPdf = editDocument.contractPdf
      }

      document.updatedAt = new Date()



      document.save((err, doc) => {

        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados da documentação')
          }
          reject(e)
          return false
        }



        const result = {
          success: true,
          code: 200,
          msg: __('Documentação alterada com sucesso.'),
          data: doc
        }
        resolve(result)
      })
    })
  })
}

// Remove document
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Document.findById(id, (erro, document) => {
      if (!document) {
        const e = {
          error: true,
          code: 400,
          msg: __('Documentação não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a documentação.')
        }
        reject(e)
        return false
      }

      document.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Documentação removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}