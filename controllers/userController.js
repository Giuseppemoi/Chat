const User = require('../models/User')

exports.login = (req, res) => {
    let user = new User(req.body)
    user.login().then(function (result) {
        req.session.user = { userName: user.data.login }
        req.session.save(()=>{
            res.redirect('chat')
        })
    }).catch(function (err) {
        req.flash('errors', err)
        req.session.save(() => {
            res.render('index', {errors: req.flash('errors')})
        })
    })
}

exports.logout = (req, res) => {
    req.session.destroy(() =>
        res.redirect('/')
    )
}

exports.signup = (req, res) => {
    console.log(req.body)
    let user = new User(req.body)
    user.register().then(() => {
        req.session.user = {userName: user.data.login}
        res.redirect('/')
    }).catch((regErrors) => {
        regErrors.forEach((error)=> {
            req.flash('regErrors', error)
        })
        req.session.save(() => {
            res.render('register', {regErrors: req.flash('regErrors')})
        })
    })

}