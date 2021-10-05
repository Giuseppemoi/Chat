const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');
const sanitizeHTML = require('sanitize-html');
const app = express();

const msgCollection = require ('./db').db().collection('msgs')

let userArray = []

let sessionOptions = session({
    secret: "Real time chat app!",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

const Msg = require('./assets/model/msgSchema')

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('view engine', 'ejs')

app.use(express.static('assets'));

app.use('/', router)

const server = require('http').createServer(app)

const io = require('socket.io')(server)

io.use(function (socket, next) {
    sessionOptions(socket.request, socket.request.res, next)
})

io.on('connection', function(socket) {
    // new user connected ?
    if (socket.request.session.user) {
        if (userArray.indexOf(socket.request.session.user.userName) === -1) {
            userArray.push(socket.request.session.user.userName)
        }
        io.emit('newUserConnected', [userArray, socket.request.session.user])

        msgCollection.find().toArray(function(err, docs) {
            //console.log(socket.request.session.user.userName)
            socket.emit('output-messages', [docs, socket.request.session.user.userName, socket.request.session.user.avatar])
        })

        let user = socket.request.session.user

        socket.emit('welcome', {username: user.userName, avatar: user.avatar})
        socket.on('msg', function(data) {
            const message = new Msg({username: user.userName, msg: sanitizeHTML(data.message, {allowedTags: [], allowedAttributes: {}}), date: new Date()})
            msgCollection.insertOne(message).then(()=> {
                socket.broadcast.emit('msg', {message: sanitizeHTML(data.message, {allowedTags: [], allowedAttributes: {}}), username: user.userName, avatar: user.avatar})
            })
            //socket.broadcast.emit('msg', {message: sanitizeHTML(data.message, {allowedTags: [], allowedAttributes: {}}), username: user.userName, avatar: user.avatar})
        })
    }

    socket.on('disconnect', function() {
        io.emit('userDisconnected', socket.request.session.user)
    })
})

// socket.on('disconnect', function() {
//     console.log('disconnect')
// })
module.exports = server
