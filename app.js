require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Movie = require('./models/Movie')

app.use(express.json());
app.use(cors());

//Connect to Mongodb

const dbURI = process.env.MONGO_CONNECTION

mongoose.connect(dbURI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to data base')
    })
    .catch((err) => {
        console.log('unable to connect to database' + err)
    })

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

app.get('/', getMovies)
app.get('/movies', getMovies)

//Get one
app.get('/movies/:id', async (req, res) => {
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

//Create one
app.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        row: req.body.row,
        cover: req.body.cover,
        sinopsis: req.body.sinopsis,
        duration: req.body.duration,
        genre: req.body.genre,
        type: req.body.type,
        rating: req.body.rating,
        category: req.body.category
    })

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

const PORT = 3001

app.listen(process.env.PORT || PORT, () => {
    console.log(`listening to port ${PORT}`)
})