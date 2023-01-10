const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String!, bookId: String!, image: String!, link: String!, title: String!): User
        login(username: String!, email: String!, password: String!): Auth
        deleteBook(bookId: String!): User

    }
`;

module.exports = typeDefs;