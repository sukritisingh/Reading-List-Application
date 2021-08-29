const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')

const  { 
    GraphQLObjectType,
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull //WIll not accept null value for certain fields
 } = graphql;

//dummy data 
var books = [
    { }
]

var authors = []
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type : GraphQLString},
        genre: { type: GraphQLString},
        author: { 
            type: AuthorType,
            resolve(parent, args){
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorID)
            }
        }
    })
});

const AuthorType  = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type : GraphQLString},
        age: { type: graphql.GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, { authorId : parent.id});
                return Book.find({
                    authorID: parent.id // Look for all records in the Book collection wit the authorid
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                //Code to get data from db/other source
                // return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type:GraphQLID}},
            resolve(parents, args){
                // return _.find(authors, { id: parents.authorId});
                return Author.findById(args.id) // Goes to the Author collection and finds the author with this ID
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: { type:new GraphQLNonNull(graphql.GraphQLInt) },
                 
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
         },
         addBook: {
             type: BookType,
             args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type:  new GraphQLNonNull(GraphQLString)},
                authorID: { type: new GraphQLNonNull(GraphQLID)}
             },
             resolve(parent, args){
                 let book = new Book({
                     name: args.name,
                     genre: args.genre,
                     authorID: args.authorID
                 });
                 return book.save();
             }
         }
    }
})

module.exports  = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});