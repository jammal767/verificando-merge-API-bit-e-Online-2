module.exports = {
  allow: (allowProfiles) => {
    return (req, res, next) => {
      if (allowProfiles.includes(req.decoded.user_profile)) {
        return next()
      } else {
        return res.status(401).json({
          error: true,
          code: 401,
          msg: __('not_authorized')
        })
      }
    }
  }
}