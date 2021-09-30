let socket = io();
let button = document.getElementById('submit')

let send = function(){
    let text = document.getElementById("input").value;
    socket.emit('chat message',text)
}

button.addEventListener('click', send)

let recu = function(msg){
    let div = `<div class="sendmessageuser1">
                        <img class="avatar" src="" alt="avatar">
                        <p class="textmessage">${msg}</p>
                    </div>`;
    document.getElementById('messages').innerHTML += div
    // let li = document.createElement('li');
    // li.innerText = msg;
    // document.getElementById('messages').appendChild(li);
}

socket.on('chat message', recu);

socket.on('output-messages', data => {
    if (data.length) {
        data.forEach(message => {
            let div = `<div class="sendmessageuser1">
                            <img class="avatar" src="img/avatar1.png" alt="avatar">
                            <p class="textmessage">${message.msg}</p>
                       </div>`;
            document.getElementById('messages').innerHTML += div
            // let li = document.createElement('li');
            // li.innerText = message.msg;
            // document.getElementById('messages').appendChild(li);
        })
    }
})
