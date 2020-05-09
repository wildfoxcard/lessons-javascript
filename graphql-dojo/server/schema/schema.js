const graphql = require('graphql');

const { GraphQLObjectType, GraphQlString } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQlString },
        name: { type: GraphQlString },
        genre: { type: GraphQlString }
    })
});