require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movies')


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

//Routes Middleware
app.use('/', movieRoutes)

//Port to listen
const PORT = 3001

app.listen(process.env.PORT || PORT, () => {
    console.log(`listening to port ${PORT}`)
})