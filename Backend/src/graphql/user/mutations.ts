export const mutations = `
    addUser(name: String!, age: Int!): User!
    updateUser(id: ID!, name: String, age: Int): User
    deleteUser(id: ID!): User
    addPost(userId: ID!, desc: String!): Post!
`