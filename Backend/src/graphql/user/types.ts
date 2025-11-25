export const types = `
    type User {
        id: ID!
        name: String!
        email: String!
        password : String!
        posts: [Post!]!
      }

      type Post {
        id: ID!
        title: String!
        user: User!
      }
`;