exports.index = (req, res) => { res.render('index') }
exports.register = (req, res) => { res.render('register') }
exports.chat = (req, res) => {
    if (req.session.user) {
        res.render('messages', {userName: req.session.user.userName})
    } else {
        res.render('index')
    }
}