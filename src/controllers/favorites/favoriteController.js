const mongoose = require('mongoose')
const Favorite = require('../../models/favorite')



exports.verifyFavorited = ({ userId, unitId }) => {
  return new Promise((resolve, reject) => {
    Favorite.findOne({ user: userId, unit: unitId }, (err, favorite) => {

      if (err) {
        reject(err)
        return;
      }

      const result = {
        success: true,
        code: 200,
        data: favorite
      }

      resolve(result)
      return

    })
  })
}

// List All Categories
exports.list = (id) => {
  const userId = mongoose.Types.ObjectId(id)
  return new Promise((resolve, reject) => {
    Favorite.aggregate([
      { $match: { user: userId } },
      { $lookup: { from: 'units', foreignField: '_id', localField: 'unit', as: 'unit' } },
      { $lookup: { from: 'favorites', foreignField: 'unit', localField: 'unit._id', as: 'favorites' } },
      { $lookup: { from: 'enterprises', foreignField: '_id', localField: 'unit.enterprise', as: 'enterprise' } },
      { $unwind: "$enterprise" },
      { $project: { favorites: { user: 1 }, unit: { _id: 1, photos: 1, price: 1, description: 1, number: 1 }, enterprise: { _id: 1, photos: 1, name: 1, draft: 1, logo: 1, status: 1, address: 1 } } },
      { $sort: { created_at: -1 } },
    ]).exec(async (err, favorites) => {

      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('fail_list_favorites')
        }
        reject(e)
        return false
      }

      const result = {
        success: true,
        code: 200,
        data: favorites
      }

      resolve(result)
    })
  })
}


// Create favorite
exports.create = (favorite) => {

  return new Promise(async (resolve, reject) => {

    let favoriteExist = await Favorite.findOne({ user: favorite.user, unit: favorite.unit });

    if (!favoriteExist) {

      new Favorite(favorite).save((err, favorite) => {
        if (err) {
          const e = {
            error: true,
            code: 400,
            msg: __('Falha ao adicionar o favorito')
          }
          return reject(e)
        }

        const result = {
          favorited: true,
          success: true,
          code: 200,
          msg: __('Favorito adicionado com sucesso.'),
          data: favorite
        }
        return resolve(result)
      })
    } else {
      favoriteExist.remove((erro) => {
        const result = {
          favorited: false,
          success: true,
          code: 200,
          msg: __('Favorito removido com sucesso.')
        }
        resolve(result)
      })
    }

  })
}

// Remove favorite
exports.delete = ({ userId, unitId }) => {
  return new Promise((resolve, reject) => {
    Favorite.findOne({ user: userId, unit: unitId }, (erro, favorite) => {
      if (!favorite) {
        const e = {
          error: true,
          code: 400,
          msg: __('Favorito não encontrado.')
        }
        reject(e)
        return false
      }

      if (erro) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha ao remover o favorito.')
        }
        reject(e)
        return false
      }

      favorite.remove((erro) => {
        const result = {
          success: true,
          code: 200,
          msg: __('Favorito removido com sucesso.')
        }
        resolve(result)
      })
    })
  })
}