const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required:true
    },

    row: {
        type: String,
        required: true,
    },

    cover:{
        type: String,
        required: true
    },

    sinopsis: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    },

    genre: {
        type: Array,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    rating: {
        type: String,
        required: true
    },

    category:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Movie', movieSchema)