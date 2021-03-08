function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be logged in!')
    return res.redirect('/login')
}

module.exports = auth