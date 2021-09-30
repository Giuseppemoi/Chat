<<<<<<< HEAD:assets/js/client.js
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
=======
let socket = io('http://localhost:3000');
       let button = document.getElementById('submit')
          let send = function(){
              let text = document.getElementById("input").value;
              socket.emit('chat message',text)
          }
          button.addEventListener("click", send)
          let recu = function(msg){
              let li = document.createElement('li');
              li.innerText = msg;
              document.getElementById('messages').appendChild(li);   
          }
          socket.on('chat message', recu);
        
>>>>>>> master:socket.js
