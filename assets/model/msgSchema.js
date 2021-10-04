const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true
    },
    msg: {
        type: 'string',
        required: true
    },
    date: {
        type: 'string'
    }
})

const Msg = mongoose.model('msg', msgSchema)
module.exports = Msg
