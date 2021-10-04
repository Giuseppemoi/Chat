let socket = io();
let button = document.getElementById('submit')
let send = function(){
    let text = document.getElementById("input").value;
    socket.emit('chat message',text)
}
button.addEventListener('click', send)
let recu = function(msg){
    let li = document.createElement('li');
    li.innerText = msg;
    document.getElementById('messages').appendChild(li);
}
socket.on('chat message', recu);
socket.on('output-messages', data => {
    if (data.length) {
        data.forEach(message => {
            let li = document.createElement('li');
            li.innerText = message.msg;
            document.getElementById('messages').appendChild(li);
        })
    }
})


// app.get("/",(req , res) =>{
//     res.sendFile(__dirname + '/index.html')
// })

// app.get("/register",(req , res) =>{
//     res.sendFile(__dirname + '/register.html')
// })

// app.get("/chat",(req , res) =>{
//     res.sendFile(__dirname + '/messages.html')
// })
