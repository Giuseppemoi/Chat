const express = require("express");
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const mongoose = require('mongoose')
const Msg = require('./assets/model/msgSchema')
const User = require('./assets/model/userSchema')

app.use(express.static('assets'));

const URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/messages?retryWrites=true&w=majority"

mongoose.connect(URI).then( () =>{
    console.log('connected')
})
let ejs = require('ejs');

app.get("/",(req , res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.get("/register",(req , res) =>{
    res.sendFile(__dirname + '/register.html')
})

app.post("/register",(req , res) =>{
    console.log(req)
})

app.get("/chat",(req , res) =>{
    res.sendFile(__dirname + '/messages.html')
})

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

http.listen(3000, () => {
    console.log('connected')
})