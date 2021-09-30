const express = require('express')
const router = express.Router()
const htmlController = require('./controllers/htmlController')
const userController = require("./controllers/userController");

router.get('/', htmlController.index)

router.get('/register', htmlController.register)

router.get('/chat', htmlController.chat)

router.post('/register', userController.signup)

router.post('/login', userController.login)

module.exports = router