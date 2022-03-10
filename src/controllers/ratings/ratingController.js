const Rating = require('../../models/rating')

exports.list = (query) => {

  // Caso tenha alguma pesquisa
  if (query.search && query.search.length > 1) {
    query = { ...query, $text: { $search: query.search } }
    delete query.search
  } else {
    delete query.search
  }

  let limit = parseInt(query.limit || 10)
  let skip = limit * (query.page - 1)
  let page = query.page || 1

  if (query.page || query.limit) {
    delete query.limit
    delete query.page
  }

  return new Promise((resolve, reject) => {
    Rating.find(query, async (err, ratings) => {
      if (err) {
        let e = {
          error: true,
          code: 400,
          msg: __('fail_list_ratings')
        }
        reject(e)
        return false
      }

      const count = await Rating.countDocuments(query, (error, c) => c)

      let result = {
        success: true,
        code: 200,
        data: ratings,
        total: count,
        paginate: {
          total: count,
          page: page,
          total_pages: Math.ceil(count / limit, 1),
          limit: limit
        }
      }

      resolve(result)
    }).skip(skip).limit(limit).populate('user', '_id name avatar ').sort({ createdAt: -1 })
  })
}


// Create rating
exports.create = (rating) => {
  return new Promise((resolve, reject) => {
    new Rating(rating).save((err, rating) => {
      if (err) {
        const e = {
          error: true,
          code: 400,
          msg: __('Falha a registrar avaliação')
        }
        return reject(e)
      }

      const result = {
        success: true,
        code: 200,
        msg: __('Avaliação enviada com sucesso.'),
        data: rating
      }
      return resolve(result)
    })
  })
}
