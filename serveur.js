const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const mongoose = require('mongoose')

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
const User = require('./assets/model/userSchema')

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.set('view engine', 'ejs')

app.use(express.static('assets'));

// const URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/messages?retryWrites=true&w=majority"

// mongoose.connect(URI).then( () =>{
//     console.log('connected')
// })

app.use('/', router)

io.on('connection', (socket) => {
    console.log('user connected');

    Msg.find().then((res)=> {
        socket.emit('output-messages', res)
    })

    socket.on('disconnect', () => {
        console.log('user disconnect');
    })

    socket.on('chat message', (msg) => {
        const message = new Msg({msg, date: Date()})
        message.save().then(()=> {
            io.emit('chat message', msg);
        })
        console.log('message recu  : ' + msg);
    })
})
module.exports = app
// http.listen(3000, () => {
//     console.log('connected')
// })