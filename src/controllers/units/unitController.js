const Unit = require('../../models/unit')
const mongoose =require('mongoose');

// List all
exports.list = (query) => {
  if (query.search && query.search.length > 1) {
    query = { ...query, $text: { $search: query.search } }
    delete query.search
  } else {
    delete query.search
  }

  let limit = parseInt(query.limit) || 10
  let page = query.page || 1
  let skip = limit * (page - 1)

  if (page || query.limit) {
    delete query.limit
    delete page
  }

  if(query.enterprise){
    query.enterprise = mongoose.Types.ObjectId(query.enterprise)
  }

  return new Promise((resolve, reject) => {
    Unit.aggregate(
      [
        { $match: query },
        { $lookup: { from: 'favorites', foreignField: 'unit', localField: '_id', as: 'favorites' } },
        { $lookup: { from: 'enterprises', foreignField: '_id', localField: 'enterprise', as: 'enterprise' } },
        { $unwind: '$enterprise' },
        { $project: { favorites: {user:1}, enterprise: {_id: 1, name: 1, logo: 1, address: 1 }, public: 1, description: 1, createdAt: 1, photos: 1, number: 1, price: 1, additionals: 1 } },
        { $sort: {created_at: -1}},
        { $skip: skip },
        { $limit: limit }
      ]
    ).exec(async (err, units) => {
      if (err) {

        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_units')
        }
        reject(e)
        return false
      }

      const count = await Unit.countDocuments(query).then((c) => c)

      const result = {
        success: true,
        code: 200,
        data: units,
        paginate: {
          total: count,
          page: page,
          total_pages: Math.ceil(count / limit, 1),
          limit: limit
        }
      }

      resolve(result)
    })
  })
}

// Create unit
exports.create = (unit) => {
  return new Promise((resolve, reject) => {
    new Unit(unit).save((err, unit) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao adicionar a unidade')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Unidade adicionada com sucesso.'),
        data: unit
      }
      return resolve(result)
    })
  })
}

// Show Unit
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    Unit.findById(id, (err, unit) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao exibir os dados da unidade.')
        }
        reject(e)
        return false
      }

      if (!unit) {
        const e = {
          error: true,
          code: 400,
          msg: __('Unidade não encontrada.')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: unit
      }
      resolve(result)
    }).populate('enterprise additionals.additional', 'category name photos description hotsiteUrl')
  })
}

// Update
exports.update = (editUnit) => {
  return new Promise((resolve, reject) => {
    Unit.findById(editUnit._id, (err, unit) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao atualizar os dados da unidade.')
        }
        reject(e)
        return false
      }

      if (!unit) {
        const e = {
          error: true,
          code: 400,
          msg: __('Unidade não encontrada.')
        }
        reject(e)
        return false
      }

      if(editUnit.name){
        unit.name = editUnit.name;
      }

      if(editUnit.enterprise){
        unit.enterprise = editUnit.enterprise;
      }

      if(editUnit.description){
        unit.description = editUnit.description;
      }

      if(editUnit.meters){
        unit.meters = editUnit.meters;
      }

      if(editUnit.features){
        unit.features = editUnit.features;
      }

      if(editUnit.number){
        unit.number = editUnit.number;
      }

      if(editUnit.videoUrl){
        unit.videoUrl = editUnit.videoUrl;
      }

      if(editUnit.photos){
        unit.photos = editUnit.photos;
      }

      if(editUnit.rooms){
        unit.rooms = editUnit.rooms;
      }

      if(editUnit.suites){
        unit.suites = editUnit.suites;
      }

      if(editUnit.semissuites){
        unit.semissuites = editUnit.semissuites;
      }

      if(editUnit.garage){
        unit.garage = editUnit.garage;
      }

      if(editUnit.bathrooms){
        unit.bathrooms = editUnit.bathrooms;
      }

      if(editUnit.plant){
        unit.plant = editUnit.plant;
      }

      if(editUnit.price){
        unit.price = editUnit.price;
      }

      if(editUnit.percentageInput){
        unit.percentageInput = editUnit.percentageInput;
      }

      if(editUnit.percentageMonthly){
        unit.percentageMonthly = editUnit.percentageMonthly;
      }

      if(editUnit.percentageSemiannual){
        unit.percentageSemiannual = editUnit.percentageSemiannual;
      }

      if(editUnit.percentageKeys){
        unit.percentageKeys = editUnit.percentageKeys;
      }

      if(editUnit.interestRate){
        unit.interestRate = editUnit.interestRate;
      }

      if(editUnit.sold){
        unit.sold = editUnit.sold;
      }

      if(editUnit.reserved){
        unit.reserved = editUnit.reserved;
      }

      if(editUnit.tower){
        unit.tower = editUnit.tower;
      }

      if(editUnit.public){
        unit.public = editUnit.public;
      }

      if(editUnit.additionals){
        unit.additionals = editUnit.additionals;
      }

      unit.updatedAt = new Date()

      unit.save((err, unit) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao atualizar os dados da unidade')
          }
          reject(e)
          return false
        }

        const result = {
          success: true,
          code: 200,
          msg: __('Unidade alterada com sucesso.'),
          data: unit
        }
        resolve(result)
      })
    })
  })
}

// Remove unit
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    Unit.findById(id, (erro, unit) => {
      if (!unit) {
        const e = {
          error: true,
          code: 400,
          msg: __('Unidade não encontrada.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover a unidade.')
        }
        reject(e)
        return false
      }

      unit.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Unidade removida com sucesso.')
        }
        resolve(result)
      })
    })
  })
}
