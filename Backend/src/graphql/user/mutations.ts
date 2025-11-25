export const mutations = `
    addUser(name: String!, email: String!, password: String!): User!
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): User
    addPost(userId: ID!, title: String!): Post!
`