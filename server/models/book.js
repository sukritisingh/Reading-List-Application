const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorID: String
});

module.exports = mongoose.model('Book', bookSchema); //Models: Collections in a database. Book is a collection which will have objects that look like the bookschema