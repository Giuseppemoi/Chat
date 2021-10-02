class Chat {
    constructor() {
        this.chatLog = document.querySelector('#messages')
        this.chatField = document.querySelector('#input')
        this.chatField.focus()
        this.chatForm = document.querySelector('#chatForm')
        this.events()
    }

    // Events
    events() {
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.sendMessageToServer()
        })
    }

    //Methods
    sendMessageToServer() {
        this.socket.emit('msg', {message: this.chatField.value})
        this.chatLog.insertAdjacentHTML('beforeend',`
        <div class="sendmessageuser1">
            <p class="datetime" id=""></p>
            <img class="avatar" id="" src="img/Avatar2.png" alt="avatar">
            <p class="textmessage" id="">${this.chatField.value}</p>
            <div class="edit">
                <a class="modified" href=""><img src="img/crayon.png" alt="crayon"></a>
                <a class="deleted" href=""><img src="img/delete.png" alt="dossier avec croix"></a>
           </div>
        </div>
        `)
        this.chatLog.scrollTop = this.chatLog.scrollHeight
        this.chatField.value = ''
        this.chatField.focus()
    }

    openConnection() {
        this.socket = io()
        this.socket.on('welcome', data => {
            this.username = data.userName
            this.avatar = data.avatar
        })
        this.socket.on('msg', (data) => {
            this.displayMessage(data)
        })
        this.socket.on('output-messages', (data) => {
            this.displayOldMessages(data)
        })

    }

    displayOldMessages(data) {
        if (data[0].length) {
            data[0].forEach(message => {
                if (message.username === data[1]) {
                    this.chatLog.insertAdjacentHTML('beforeend', `
                    <div class="sendmessageuser1">
                        <p class="datetime" id="">${message.date}</p>
                        <img class="avatar" id="" src="img/avatar1.png" alt="avatar">
                        <p class="textmessage" id="">${message.msg}</p>
                        <div class="edit">
                            <a class="modified" href=""><img src="img/crayon.png" alt="crayon"></a>
                            <a class="deleted" href=""><img src="img/delete.png" alt="dossier avec croix"></a>
                        </div>
                    </div>
                    `)
                } else {
                    this.chatLog.insertAdjacentHTML('beforeend', `
                    <div class="sendmessageuser2">
                        <p class="datetime" id="">${message.date}</p>
                        <img class="avatar" id="" src="img/avatar1.png" alt="avatar">
                        <p>${message.username}</p>
                        <p class="textmessage" id="">${message.msg}</p>
                        <div class="edit">
                            <a class="modified" href=""><img src="img/crayon.png" alt="crayon"></a>
                            <a class="deleted" href=""><img src="img/delete.png" alt="dossier avec croix"></a>
                        </div>
                    </div>
                    `)
                }
            })
        }
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }

    displayMessage(data) {
        this.chatLog.insertAdjacentHTML('beforeend', `
        <div class="sendmessageuser2">
            <p class="datetime" id=""></p>
            <img class="avatar" id="" src="img/avatar1.png" alt="avatar">
            <p>${data.username}</p>
            <p class="textmessage" id="">${data.message}</p>
            <div class="edit">
                <a class="modified" href=""><img src="img/crayon.png" alt="crayon"></a>
                <a class="deleted" href=""><img src="img/delete.png" alt="dossier avec croix"></a>
            </div>
        </div>
        `)
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }

}

let chat = new Chat

chat.openConnection()
