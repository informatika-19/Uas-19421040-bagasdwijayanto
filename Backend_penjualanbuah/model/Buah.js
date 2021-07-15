const mongoose = require('mongoose')
const Schema = mongoose.Schema

const buahSchema = new Schema({
    namaBuah: {
        type: String
    },
    harga: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    },
    deskripsi: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('buah', buahSchema)