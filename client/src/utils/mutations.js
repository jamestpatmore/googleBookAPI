import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token 
            user {
                _id
                email
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!, $password: String!) {
        login(username; $username, email: $email, password: $password) {
            token
            user {
                _id
                username 
                email
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
        saveBook(input: $input) {
            _id
            username
            email
            bookCount
            saveBooks {
                bookId
                authors 
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors 
                description 
                title
                image 
                link 
            }
        }
    }
`;

