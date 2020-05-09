const graphql = require('graphql');

const { GraphQLObjectType, GraphQlString, GraphQLSchema } = graphql;

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

