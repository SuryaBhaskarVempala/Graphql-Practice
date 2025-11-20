export const types = `
    type User {
        id: ID!
        name: String!
        email: String!
        password : String!
        Posts: [Post!]!
      }

      type Post {
        id: ID!
        title: String!
        User: User!
      }
`;