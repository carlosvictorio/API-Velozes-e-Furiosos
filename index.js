const express = require("express")
const mongoose = require('mongoose')

const app = express()
const port = 3000


app.use(express.json())

const Movie = mongoose.model('movie', {
    title: String,
    description: String,
    img_url: String,
    trailer: String
})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://victorionogueira:CKeZvBywZp3izGcs@api.vwvwb1q.mongodb.net/?retryWrites=true&w=majority')

    console.log("App running on port 3000")
})

app.get('/', async (req, res) => {
    const movies = await Movie.find()

    res.send(movies)
})

app.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        img_url: req.body.img_url,
        trailer: req.body.trailer
    })

    await movie.save()

    res.send(movie)
})

app.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    res.send(movie)
})

app.put('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        img_url: req.body.img_url,
        trailer: req.body.trailer
    }, {new: true})

    res.send(movie)
})