"use strict";

var express = require("express");

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

var mongoose = require('mongoose');

var Msg = require('./assets/model/msgSchema');

var User = require('./assets/model/userSchema');

app.use(express["static"]('assets'));
var URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/messages?retryWrites=true&w=majority"; // const user = new User({name: 'coucou', email: 'sdhfbjdhb', password: 'hdbzjehvbdjzhebd'})
// user.save().then(()=> {
//     console.log('user saved');
//
// })

mongoose.connect(URI).then(function () {
  console.log('connected');
});

var ejs = require('ejs');

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get("/register", function (req, res) {
  res.sendFile(__dirname + '/register.html');
});
app.get("/chat", function (req, res) {
  res.sendFile(__dirname + '/messages.html');
});
io.on('connection', function (socket) {
  Msg.find().then(function (result) {
    socket.emit('output-messages', result);
  });
  console.log('user connected');
  Msg.find().then(function (res) {
    socket.emit('output-messages', res);
  });
  socket.on('disconnect', function () {
    console.log('user disconnect');
  });
  socket.on('chat message', function (msg) {
    var message = new Msg({
      msg: msg,
      date: Date()
    });
    message.save().then(function () {
      io.emit('chat message', msg);
    });
    console.log('message recu  : ' + msg);
  });
});
http.listen(3000, function () {
  console.log('connected');
});