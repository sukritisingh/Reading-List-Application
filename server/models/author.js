const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema); //Models: Collections in a database. Book is a collection which will have objects that look like the bookschema