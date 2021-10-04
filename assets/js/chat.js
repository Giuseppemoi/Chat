let date1 = new Date();

let dateLocale = date1.toLocaleString('en-US',{
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'});
class Chat {
    constructor() {
        this.chatLog = document.querySelector('#messages')
        this.chatField = document.querySelector('#input')
        this.chatField.focus()
        this.chatForm = document.querySelector('#chatForm')
        this.userLog = document.querySelector('#containernames')
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
            <p class="datetime" id="">${dateLocale}</p>
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
        this.socket.on('newUserConnected', (data) => {
            this.displayUser(data)
        })
        this.socket.on('userDisconnected', (data) => {
            let hzedgzegdez = document.querySelector('#containernames')
            console.log(data)
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
                        ${this.editButton(message.username, data[1])}
                    </div>
                    `)
                } else {
                    this.chatLog.insertAdjacentHTML('beforeend', `
                    <div class="sendmessageuser2">
                        <p class="datetime" id="">${message.date}</p>
                        <div class="profil">
                        <img class="avatar" id="" src="img/avatar1.png" alt="avatar">
                        <p class="usernamemessage">${message.username}</p>
                        </div>
                        <p class="textmessage" id="">${message.msg}</p>
                        ${this.editButton(message.username, data[1])}
                    </div>
                    `)
                }
            })
        }
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }

    editButton(username1, username2) {
        if (username1 === username2) {
            return `<div class='edit'>
                <a class='modified' href=""><img src='img/crayon.png' alt='crayon'></a>
                <a class='deleted' href=""><img src='img/delete.png' alt='dossier avec croix'></a>
            </div>`;
        } else {
            return ''
        }
    }
    displayMessage(data) {
        this.chatLog.insertAdjacentHTML('beforeend', `
        <div class="sendmessageuser2">
            <p class="datetime" id=""></p>
            <div class="profil">
            <img class="avatar" id="" src="img/avatar1.png" alt="avatar">
            <p class="usernamemessage">${data.username}</p>
            </div>
            <p class="textmessage" id="">${data.message}</p>
            
        </div>
        `)
        this.chatLog.scrollTop = this.chatLog.scrollHeight
    }

    displayUser(data) {
        data.forEach(user => {
            this.userLog.insertAdjacentHTML('beforeend', `
            <div class="senduser" id="${user}">
                <img class="avatar" src="" alt="avatar">
                <div class="usermessage">${user}</div>
            </div>
            `)
        })
    }
}

let chat = new Chat

chat.openConnection()
