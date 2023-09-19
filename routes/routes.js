const express = require('express')
const router = express.Router();
// Model
const Movie = require('../models/Movie')

//Requests

//Function to make the request
const getMovies = async (req, res) => {
    try {
        const movie = await Movie.find();
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

router.get('/', getMovies)
router.get('/movies', getMovies)

//Get one
router.get('/movies/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const movie = await Movie.findById(id)

        if (!movie) {
            res.status(404).json({ message: 'Movie not found' })
        }

        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// //Create one
// router.post('/', async (req, res) => {
//     const movie = new Movie({
//         title: req.body.title,
//         row: req.body.row,
//         cover: req.body.cover,
//         sinopsis: req.body.sinopsis,
//         duration: req.body.duration,
//         genre: req.body.genre,
//         type: req.body.type,
//         rating: req.body.rating,
//         category: req.body.category
//     })

//     try {
//         const newMovie = await movie.save();
//         res.status(201).json(newMovie)
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })