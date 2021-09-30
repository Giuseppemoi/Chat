const mongoose = require('mongoose')
const User = require("../model/userSchema");

const URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/users?retryWrites=true&w=majority"

mongoose.connect(URI).then( () =>{
    console.log('connected')
})
let userName = document.getElementById("username").value;
let email = document.getElementById("email").value
let password = document.getElementById("password").value
console.log('userName')
const user = new User({name: userName, email: email, password: password})
user.save().then(()=> {
    console.log('user saved');

})