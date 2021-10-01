let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let ejs = require('ejs');

app.get("/",(req , res) =>{
    res.sendFile(__dirname + '/test.html')
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnect');
    })
    socket.on('chat message', (msg) => {
        console.log('message recu  : ' + msg);
        io.emit('chat message', msg);
    })
})

http.listen(3000, () => {

    console.log('connected')
})