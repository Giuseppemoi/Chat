let express = require('express');
let app = express()
let http = require('http').Server(app);
let io = require('socket.io')(http);
const mongoose = require('mongoose')
const Msg = require('./assets/model/msgSchema')
const User = require('./assets/model/userSchema')
app.use(express.static('assets'));

const URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/messages?retryWrites=true&w=majority"
const user = new User({name: 'coucou', email: 'sdhfbjdhb', password: 'hdbzjehvbdjzhebd'})
user.save().then(()=> {
    console.log('user saved');

})
mongoose.connect(URI).then( () =>{
    console.log('connected')
})

app.get("/",(req , res) =>{
    res.sendFile(__dirname + '/index.html')
})

app.get("/connected",(req , res) =>{
    res.sendFile(__dirname + '/test.html')
})

io.on('connection', (socket) => {
    Msg.find().then(result => {
        socket.emit('output-messages', result);
    })
    console.log('user connected');
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