const dotenv = require('dotenv')
dotenv.config()
const mongodb = require('mongodb')

mongodb.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    module.exports = client
    const app = require('./serveur')
    app.listen(process.env.PORT)
})

// const mongoose = require('mongoose')
//
// const URI = "mongodb+srv://admin:abmyn0ERpP7vIJeJ@chat.mmksw.mongodb.net/messages?retryWrites=true&w=majority"
//
// mongoose.connect(URI).then( (res) =>{
//     module.exports = res
//     const app = require('./serveur')
//     app.listen(3000)
// })