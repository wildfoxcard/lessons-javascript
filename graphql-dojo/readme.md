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
1) Node.js - Express App as GraphQl Server
2) Database - MongoDB on mLab

frontend:
1) React App - using Apollo

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



