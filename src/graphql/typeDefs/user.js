import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    authUser: User!
    authenticateUser(username: String!, password: String!): AuthResp!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
  }

  input UserInput {
    avatarImage: String
    firstName: String!
    lastName: String!
    username: String!
    password: String!
    email: String!
  }

  type User {
    id: ID!
    avatarImage: String
    firstName: String!
    lastName: String!
    username: String!
    email: String!
  }

  type AuthResp {
    user: User!
    token: String!
  }
`;
