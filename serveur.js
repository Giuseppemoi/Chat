const express = require("express");
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Msg = require('./assets/model/msgSchema');
//const User = require('./assets/model/userSchema');
const Users = [];
app.use(express.static('assets'));
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/messages?retryWrites=true&w=majority"

mongoose.connect(URI).then( () =>{
    console.log('connected')
})

app.get('/', (req, res) => {
    res.render('index.ejs',{Msg : Msg})
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', (req, res) => {
    
})
app.get('/register', (req, res) => {
    res.render('register.ejs')
})
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        Users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
           
        })
        res.redirect('/login')  
    } catch {
        res.redirect('/register')
    }
    console.log(Users)
})



io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result);
    })
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

http.listen(3000, () => {

    console.log('connected')
})