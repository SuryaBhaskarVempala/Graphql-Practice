"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const app = express();
async function startServer() {
    app.use(express.json());
    app.use(cors());
    app.get("/test", (req, res) => {
        res.json("Surya Bhaskar!");
    });
    const users = [];
    const apolloServer = new ApolloServer({
        typeDefs: `
            type User {
                name: String
                age: Int
            }

            type Query {
                getUsers: [User]
            }

            type Mutation {
            addUser(name: String!, age: Int!): User
            }
        `,
        resolvers: {
            Query: {
                getUsers: () => users,
            },
            Mutation: {
                addUser: async (_, args) => {
                    const { name, age } = args;
                    users.push({ name, age });
                    return "Added!";
                }
            }
        }
    });
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
    app.listen(3000, () => {
        console.log("Server Started at 3000");
    });
}
startServer();
//# sourceMappingURL=app.js.map