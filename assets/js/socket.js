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
        
