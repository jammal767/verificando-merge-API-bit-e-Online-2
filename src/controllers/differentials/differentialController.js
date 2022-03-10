const Differencial = require('../../models/differential')

// List All Categories
exports.list = () => {
  return new Promise((resolve, reject) => {
    Differencial.find({}, async (err, differencials) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_differencials')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: differencials
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}


// Create differencial
exports.create = (differencial) => {
  return new Promise((resolve, reject) => {
    new Differencial(differencial).save((err, differencial) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar o diferencial')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Diferencial adicionado com sucesso.'),
        data: differencial
      }
      return resolve(result)
    })
  })
}

// Show Differencial
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Differencial.findById(id, (err, differencial) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados do diferencial.')
        }
        reject(e)
        return false
      }

      if (!differencial) {
        const e = {
          error: true,
          code: 400,
          msg: __('Diferencial não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: differencial
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editDifferencial) => {
  return new Promise((resolve, reject) => {
    Differencial.findById(editDifferencial._id, (err, differencial) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do diferencial.')
        }
        reject(e)
        return false
      }

      if (!differencial) {
        const e = {
          error: true,
          code: 400,
          msg: __('Diferencial não encontrado.')
        }
        reject(e)
        return false
      }

      if (editDifferencial.icon) {
        differencial.icon = editDifferencial.icon
      }

      if (editDifferencial.description) {
        differencial.description = editDifferencial.description
      }
      

      differencial.updatedAt = new Date()

      differencial.save((err, differencial) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados do diferencial')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Diferencial alterado com sucesso.'),
          data: differencial
        }
        resolve(result)
      })
    })
  })
}

// Remove differencial
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Differencial.findById(id, (erro, differencial) => {
      if (!differencial) {
        const e = {
          error: true,
          code: 400,
          msg: __('Diferencial não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a diferencial.')
        }
        reject(e)
        return false
      }

      differencial.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Diferencial removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}