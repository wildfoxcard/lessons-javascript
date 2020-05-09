const graphql = require('graphql');
const _ = require('lodash')

const { GraphQLObjectType, GraphQlString, GraphQLSchema } = graphql;

//dummy data
var books = [
    { name: "Name of the Wind", genre: 'Fantasy', id: "1" },
    { name: "The Final Empire", genre: 'Fantasy', id: "2" },
    { name: "The Long Earth", genre: 'Sci-Fi', id: "3" },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQlString },
        name: { type: GraphQlString },
        genre: { type: GraphQlString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQlString } },
            resolve(parent, args) {
                // args.id because we defined id
                // code to get data from db
                return _.find(books, { id: args.id });
            }
        }
    }
})

//how the query will look:
// book(id: "123") {
//     name
//     genre
// }

module.exports = new GraphQLSchema({
    query: RootQuery
})

