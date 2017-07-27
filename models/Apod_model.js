const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apodSchema = new Schema({
  title: String,
  date: Date,
  image: String,
  description: String
})

const Apod = mongoose.model('Apod', apodSchema)

module.exports = Apod
