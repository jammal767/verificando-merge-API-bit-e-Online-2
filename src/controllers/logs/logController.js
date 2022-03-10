const Log = require('../../models/log')

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
  
  if(query.page || query.limit){
    delete query.limit
    delete query.page
  }
  
  return new Promise((resolve, reject) => {
    Log.find(query, async (err, logs) => {
      if (err) {
        console.log(err)
        let e = {
          error: true,
          code: 400,
          msg: __('fail_list_logs')
        }
        reject(e)
        return false
      }

      const count = await Log.countDocuments(query, (error, c) => c)

      let result = {
        success: true,
        code: 200,
        data: logs,
        total: count,
        paginate : {
          total: count,
          page : page,
          total_pages : Math.ceil(count / limit, 1),
          limit: limit
        }
      }

      resolve(result)
    }).skip(skip).limit(limit).populate('user', '_id name avatar ').sort({createdAt: -1})
  })
}