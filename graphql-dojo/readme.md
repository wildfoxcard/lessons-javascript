# GraphQL - Dojo

from youtube playlist:

https://www.youtube.com/watch?v=Y0lDGjwRYKw&list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f

### notes from videos:

#### video 1

Frontend will be react js

Backend will be node js.

What is graphql:

It is a poweful query language used between the front-end and server.

#### video 2

This video is about an overview of GraphQL

A rest api make looks like this:

| Action              | Endpoint               |
| ------------------- | ---------------------- |
| Get all books       | domain.com/books       |
| Get a single book   | domain.com/books/:id   |
| Get all authors     | domain.com/authors     |
| Get a single author | domain.com/authors/:id |

GraphQL would look like this:

<img src="doc-images/graphql-diagram.png" width="450" title="GraphQL Diagram">

#### video 3

This is video is about our project structure.

backend:

1. Node.js - Express App as GraphQl Server
2. Database - MongoDB on mLab

frontend:

1. React App - using Apollo

GraphQL is platform agnostic

Graphiql will be used for testing graphql endpoints.

#### video 4

This video is about starting Graphiql.

This is an example of a graphql query

```graphql
{
  books {
    name
    genre
    id
  }
}
```

Another example of getting relational data with a query

```graphql
{
  books {
    name
    genre
    author {
      name
      age
    }
  }
}
```

GraphQL is a query language, it is not JavaScript

#### video 5

This video was creating a simple express app in the new server folder.

#### video 6

This video is about connecting graphql to our new express app.

```bash
npm i graphql
```

```bash
npm i express-graphql
```

How we installed on our app.js express app

```javascript
const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

app.use("/graphql", graphqlHTTP({}));

app.listen(4000, () => {
  console.log("now listening for request on port 4000");
});
```

connecting to http://localhost:4000/graphql has this error

```json
{
  "errors": [{ "message": "GraphQL middleware options must contain a schema." }]
}
```

The schema is missing.

#### video 7

This video is about creating a graphql schema

```javascript
const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
```

#### video 8

This video is about root queries. They are the entry points to the graph.

We added RootQuery to the schema.js file

```javascript
const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQlSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // args.id because we defined id
        // code to get data from db
      },
    },
  },
});

//how the query will look:
// book(id: "123") {
//     name
//     genre
// }

modules.exports = new GraphQlSchema({
  query: RootQuery,
});
```

This was added to the app.js file created in an earlier video

```javascript
const schema = require("./schema/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);
```

#### video 9

This video is about the resolve function.

Lodash has been installed.

```JavaScript
npm i lodash
```

Dummy data was created and the resolve is used to search the dummy data using lodash

```javascript
const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // args.id because we defined id
        // code to get data from db
        return _.find(books, { id: args.id }); // <---- This
      },
    },
  },
});

//how the query will look:
// book(id: "123") {
//     name
//     genre
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

#### Video 10

This video is about testing queries in Graphiql

Using http://localhost:4000/graphql now will result in the following error:

```json
{ "errors": [{ "message": "Must provide query string." }] }
```

We need a tool to interact with this endpoint.

In the app.js we need to add the graphiql tool:

```JavaScript
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
```

Now if I go to http://localhost/graphql I will see this tool:

<img src="doc-images/graphiql.png" width="450" title="GraphQL Diagram">

There is a exporer on the right to view rootQueryType

<img src="doc-images/graphiql-rootquerytype.png" width="450" title="GraphQL Diagram">

All strings must be double quote, no single quotes.

<img src="doc-images/graphiql-book-firstsearch.png" width="450" title="GraphQL Diagram">

#### Video 11

This video is about the GraphQL ID Type

If you take away the strings from the id in a book search, it will not work.

<img src="doc-images/graphiql-bad-id.png" width="450" title="GraphQL Diagram">

If we change the "GraphQLString" to a "GraphQLID", then the arg can be a string or integer.

```javascript
const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID }, // <--Here
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, // <--Here
      resolve(parent, args) {
        // args.id because we defined id
        // code to get data from db
        return _.find(books, { id: args.id });
      },
    },
  },
});

//how the query will look:
// book(id: "1") {
//     name
//     genre
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

Now the following two queries will work:

```graphql
{
  book(id: "1") {
    name
    genre
  }
}
```

```graphql
{
  book(id: 1) {
    name
    genre
  }
}
```

#### video 12

This video is about adding the author type to the schema.

New dummy data and authorType has been created with a modification of the RootQuery

```javascript
const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

// New
var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// New
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // args.id because we defined id
        // code to get data from db
        return _.find(books, { id: args.id });
      },
    },

    // New
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

Now we can query the author

```graphql
{
  author(id: 2) {
    name
    age
  }
}
```

#### video 13

This video is about type Relations

We add authorId to books and added the AuthorType to the BookType

```javascript
const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

//dummy data
var books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" }, // <--Here
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" }, // <--Here
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" }, // <--Here
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      // <--Here
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // args.id because we defined id
        // code to get data from db
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

Now the following query works

```graphql
{
  book(id: 2) {
    name
    genre
    author {
      name
    }
  }
}
```
