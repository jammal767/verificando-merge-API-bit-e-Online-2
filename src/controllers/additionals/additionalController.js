const Additional = require('../../models/additional')

// List All
exports.list = () => {
  return new Promise((resolve, reject) => {
    Additional.find({}, async (err, additionals) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_additionals')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: additionals
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}


// Create additional
exports.create = (additional) => {
  return new Promise((resolve, reject) => {
    new Additional(additional).save((err, additional) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar o adicional')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Adicional adicionado com sucesso.'),
        data: additional
      }
      return resolve(result)
    })
  })
}

// Show Additional
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Additional.findById(id, (err, additional) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados do adicional.')
        }
        reject(e)
        return false
      }

      if (!additional) {
        const e = {
          error: true,
          code: 400,
          msg: __('Adicional não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: additional
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editAdditional) => {
  return new Promise((resolve, reject) => {
    Additional.findById(editAdditional._id, (err, additional) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do adicional.')
        }
        reject(e)
        return false
      }

      if (!additional) {
        const e = {
          error: true,
          code: 400,
          msg: __('Adicional não encontrado.')
        }
        reject(e)
        return false
      }

      if (editAdditional.name) {
        additional.name = editAdditional.name
      }

      if (editAdditional.description) {
        additional.description = editAdditional.description
      }

      if (editAdditional.photos) {
        additional.photos = editAdditional.photos
      }

      additional.updatedAt = new Date()

      additional.save((err, additional) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados do adicional')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Adicional alterado com sucesso.'),
          data: additional
        }
        resolve(result)
      })
    })
  })
}

// Remove additional
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Additional.findById(id, (erro, additional) => {
      if (!additional) {
        const e = {
          error: true,
          code: 400,
          msg: __('Adicional não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover o adicional.')
        }
        reject(e)
        return false
      }

      additional.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Adicional removido com sucesso.')
        }
        resolve(result)
      })
    })
  })
}