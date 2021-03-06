const mongoose = require('mongoose')
const schema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    subject: String,
    msgText: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    }
})
module.exports = mongoose.model('Message', schema)