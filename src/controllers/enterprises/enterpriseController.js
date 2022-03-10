const Enterprise = require('../../models/enterprise')

// List all
exports.listAll = (query) => {
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
    Enterprise.find(query, async (err, enterprises) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_enterprises')
        }
        reject(e)
        return false
      }

      const count = await Enterprise.countDocuments(query).then((c) => c)

      const result = {
        success: true,
        code: 200,
        data: enterprises,
        paginate: {
          total: count,
          page: page,
          total_pages: Math.ceil(count / limit, 1),
          limit: limit
        }
      }

      resolve(result)
    }).populate('category', 'name').skip(skip).limit(limit).sort({ createdAt: -1 })
  })
}

// List publics
exports.list = () => {
  return new Promise((resolve, reject) => {
    Enterprise.find({ public: true }, async (err, enterprises) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_enterprises')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: enterprises
      }

      resolve(result)
    }).sort({ createdAt: -1 })
  })
}


// Create enterprise
exports.create = (enterprise) => {
  return new Promise((resolve, reject) => {
    new Enterprise(enterprise).save((err, enterprise) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar o empreendimento')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Empreendimento adicionada com sucesso.'),
        data: enterprise
      }
      return resolve(result)
    })
  })
}

// Show Enterprise
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Enterprise.findById(id, (err, enterprise) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados do empreendimento.')
        }
        reject(e)
        return false
      }

      if (!enterprise) {
        const e = {
          error: true,
          code: 400,
          msg: __('Empreendimento não encontrado.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: enterprise
      }
      resolve(result)
    }).populate('differentials category', 'name icon description')
  })
}

// Update
exports.update = (editEnterprise) => {
  return new Promise((resolve, reject) => {
    Enterprise.findById(editEnterprise._id, (err, enterprise) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados do empreendimento.')
        }
        reject(e)
        return false
      }

      if (!enterprise) {
        const e = {
          error: true,
          code: 400,
          msg: __('Empreendimento não encontrado.')
        }
        reject(e)
        return false
      }

      if (editEnterprise.name) {
        enterprise.name = editEnterprise.name;
      }

      if (editEnterprise.draft) {
        enterprise.draft = editEnterprise.draft;
      }

      if (editEnterprise.description) {
        enterprise.description = editEnterprise.description;
      }

      if (editEnterprise.logo) {
        enterprise.logo = editEnterprise.logo;
      }

      if (editEnterprise.category) {
        enterprise.category = editEnterprise.category;
      }

      if (editEnterprise.photos) {
        enterprise.photos = editEnterprise.photos;
      }

      if (editEnterprise.differentials) {
        enterprise.differentials = editEnterprise.differentials;
      }

      if (editEnterprise.hotsiteUrl) {
        enterprise.hotsiteUrl = editEnterprise.hotsiteUrl;
      }

      if (editEnterprise.bookUrl) {
        enterprise.bookUrl = editEnterprise.bookUrl;
      }

      if (editEnterprise.tourVirtualUrl) {
        enterprise.tourVirtualUrl = editEnterprise.tourVirtualUrl;
      }

      if (editEnterprise.loc) {
        enterprise.loc = editEnterprise.loc;
      }

      if (editEnterprise.address) {
        enterprise.address = editEnterprise.address;
      }

      if (editEnterprise.state) {
        enterprise.state = editEnterprise.state;
      }

      if (editEnterprise.country) {
        enterprise.country = editEnterprise.country;
      }

      if (editEnterprise.city) {
        enterprise.city = editEnterprise.city;
      }

      if (editEnterprise.public) {
        enterprise.public = editEnterprise.public;
      }

      if (editEnterprise.start) {
        enterprise.start = new Date(`${editEnterprise.start} 15:00`);
      }

      if (editEnterprise.end) {
        enterprise.end = new Date(`${editEnterprise.end} 15:00`);
      }

      if (editEnterprise.status) {
        enterprise.status = editEnterprise.status;
      }

      enterprise.updatedAt = new Date()

      enterprise.save((err, enterprise) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados do empreendimento')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Empreendimento alterado com sucesso.'),
          data: enterprise
        }
        resolve(result)
      })
    })
  })
}

// Remove enterprise
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Enterprise.findById(id, (erro, enterprise) => {
      if (!enterprise) {
        const e = {
          error: true,
          code: 400,
          msg: __('Empreendimento não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a empreendimento.')
        }
        reject(e)
        return false
      }

      enterprise.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Empreendimento removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}