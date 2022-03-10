const Category = require('../../models/category')

// List All Categories
exports.list = () => {
  return new Promise((resolve, reject) => {
    Category.find({}, async (err, categories) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_categories')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: categories
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}


// Create category
exports.create = (category) => {
  return new Promise((resolve, reject) => {
    new Category(category).save((err, category) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar a categoria')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Categoria adicionada com sucesso.'),
        data: category
      }
      return resolve(result)
    })
  })
}

// Show Category
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Category.findById(id, (err, category) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados da categoria.')
        }
        reject(e)
        return false
      }

      if (!category) {
        const e = {
          error: true,
          code: 400,
          msg: __('Categoria não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: category
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editCategory) => {
  return new Promise((resolve, reject) => {
    Category.findById(editCategory._id, (err, category) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do categoria.')
        }
        reject(e)
        return false
      }

      if (!category) {
        const e = {
          error: true,
          code: 400,
          msg: __('Categoria não encontrado.')
        }
        reject(e)
        return false
      }

      if (editCategory.name) {
        category.name = editCategory.name
      }

      if (editCategory.description) {
        category.description = editCategory.description
      }
      

      category.updatedAt = new Date()

      category.save((err, category) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados da categoria')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Categoria alterada com sucesso.'),
          data: category
        }
        resolve(result)
      })
    })
  })
}

// Remove category
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Category.findById(id, (erro, category) => {
      if (!category) {
        const e = {
          error: true,
          code: 400,
          msg: __('Categoria não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a categoria.')
        }
        reject(e)
        return false
      }

      category.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Categoria removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}