const express = require('express');
const { graphqlHTTP } = require('express-graphql'); //Allows express to understand graphQL and provides a simple way to provide an express server to run graphql API. This is used as a middleware in a single route //act like an endpoint
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


//allow cross-origin requests
app.use(cors());

mongoose.connect('URL');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})

//Set up middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
})); // Whenever a request is made to the /graphql, graphqlHTTP handles the graphql requests

app.listen(4000, () => {
    console.log('Listening for requests on port 4000');
})