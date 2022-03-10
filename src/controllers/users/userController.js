const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const hash = require('../../libs/hash')




// List All Users
exports.list = (query) => {
  if (query.search && query.search.length > 1) {
    query = { ...query, $text: { $search: query.search } }
    delete query.search
  } else {
    delete query.search
  }

  const limit = parseInt(query.limit || 10)
  const skip = limit * (query.page - 1)
  const page = query.page || 1

  if (query.page || query.limit) {
    delete query.limit
    delete query.page
  }

  return new Promise((resolve, reject) => {
    User.find(query, async (err, users) => {
      if (err) {
        console.log(err)
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_users')
        }
        reject(e)
        return false
      }

      const count = await User.countDocuments(query).then((c) => c)

      const result = {
        success: true,
        code: 200,
        data: users,
        paginate: {
          total: count,
          page: page,
          total_pages: Math.ceil(count / limit, 1),
          limit: limit
        }
      }

      resolve(result)
    }).skip(skip).limit(limit).sort({ createdAt: -1 })
  })
}


// Create user
exports.create = (user) => {
  return new Promise((resolve, reject) => {
    new User(user).save((err, user) => {
      if (err) {
        if (err.code === 11000) {
          const e = {
            error: true,
            code: 400,
            msg: __('Esse e-mail já consta em nossos registros.')
          }
          return reject(e)
        }
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao criar um novo usuário(a)')
        }
        return reject(e)
      }

      const token = jwt.sign({
        user_id: user._id,
        user_profile: user.profile
      }, process.env.JWT_SECRET, {})

      user.token = token

      const result = {
        success: true,
        code: 200,
        msg: __('Conta criada com sucesso.'),
        data: user
      }
      return resolve(result)
    })
  })
}

// Show User
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, { active: 1, profile: 1, _id: 1, name: 1, email: 1, avatar: 1, password: 1, loc: 1, rolesAdmin: 1 }, (err, user) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados do usuário.')
        }
        reject(e)
        return false
      }

      if (!user) {
        const e = {
          error: true,
          code: 400,
          msg: __('Usuário não encontrado.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: user
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editClient) => {
  return new Promise((resolve, reject) => {
    User.findById(editClient._id, (err, user) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do usuário.')
        }
        reject(e)
        return false
      }

      if (!user) {
        const e = {
          error: true,
          code: 400,
          msg: __('Usuário não encontrado.')
        }
        reject(e)
        return false
      }

      if (editClient.name) {
        user.name = editClient.name
      }

      if (editClient.email) {
        user.email = editClient.email
      }

      if (editClient.phone) {
        user.phone = editClient.phone
      }

      if (editClient.avatar) {
        user.avatar = editClient.avatar
      }

      if (editClient.loc) {
        user.loc = editClient.loc
      }

      if (editClient.rolesAdmin) {
        user.rolesAdmin = editClient.rolesAdmin
      }

      user.updated_at = new Date()

      user.save((erro, user) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados do usuário.')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Dados alterados com sucesso.'),
          data: user
        }
        resolve(result)
      })
    })
  })
}

// Remove user
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (erro, user) => {
      if (!user) {
        const e = {
          error: true,
          code: 400,
          msg: __('Usuário não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover o usuário.')
        }
        reject(e)
        return false
      }

      user.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Usuário removido com sucesso.')
        }
        resolve(result)
      })
    })
  })
}

// Edit password
exports.edit_password = (userLogged, senhaAtual, novaSenha) => {
  return new Promise((resolve, reject) => {
    User.findById(userLogged, async (erro, user) => {
      if (!user) {
        const e = {
          error: true,
          code: 400,
          msg: __('Usuário não encontrado.')
        }
        reject(e)
        return false
      }
      const comparePassword = await hash.compare(senhaAtual, user.password)

      if (!comparePassword) {
        const e = {
          error: true,
          code: 401,
          msg: __('Senha atual inválida.')
        }
        reject(e)
        return false
      }

      user.password = novaSenha

      user.save((error, res) => {
        if (error) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao alterar a senha.')
          }
          reject(e)
          return false
        } else {
          const result = {
            success: true,
            code: 200,
            msg: __('Sua senha foi alterada com sucesso.')
          }
          resolve(result)
        }
      })
    })
  })
}