const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    msg: {
        type: 'string',
        required: true
    },
    date: {
        type: Date
    }
})

const Msg = mongoose.model('msg', msgSchema)
module.exports = Msg
