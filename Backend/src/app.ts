import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { randomUUID } from "crypto";

const app = express();

interface User {
  id: string;
  name: string;
  age: number;
}

interface Post {
  id: string;
  desc: string;
  userId: string; // relation field
}

// In-memory storage
const users: User[] = [];
const posts: Post[] = [];

async function start() {
  app.use(cors(), express.json());

  const server = new ApolloServer({
    typeDefs: `
      type User {
        id: ID!
        name: String!
        age: Int!
        posts: [Post!]!
      }

      type Post {
        id: ID!
        desc: String!
        user: User!
      }

      type Query {
        getUsers: [User!]!
        getUser(id: ID!): User
        getPosts: [Post!]!
      }

      type Mutation {
        addUser(name: String!, age: Int!): User!
        updateUser(id: ID!, name: String, age: Int): User
        deleteUser(id: ID!): User
        addPost(userId: ID!, desc: String!): Post!
      }
    `,
    resolvers: {
      Query: {
        getUsers: () => users,
        getUser: (_, args: { id: string }) => users.find(u => u.id === args.id),
        getPosts: () => posts
      },
      Mutation: {
        addUser: (_, args: { name: string; age: number }) => {
          const user: User = { id: randomUUID(), name: args.name, age: args.age };
          users.push(user);
          return user;
        },
        updateUser: (_, args: { id: string; name?: string; age?: number }) => {
          const user = users.find(u => u.id === args.id);
          if (!user) throw new Error("User not found");
          if (args.name !== undefined) user.name = args.name;
          if (args.age !== undefined) user.age = args.age;
          return user;
        },
        deleteUser: (_, args: { id: string }) => {
          const index = users.findIndex(u => u.id === args.id);
          if (index === -1) throw new Error("User not found");
          const deleted = users.splice(index, 1)[0];
          // Remove posts of this user
          for (let i = posts.length - 1; i >= 0; i--) {
            if (posts[i].userId === args.id) posts.splice(i, 1);
          }
          return deleted;
        },
        addPost: (_, args: { userId: string; desc: string }) => {
          const user = users.find(u => u.id === args.userId);
          if (!user) throw new Error("User not found for this post");
          const post: Post = { id: randomUUID(), desc: args.desc, userId: args.userId };
          posts.push(post);
          return post;
        }
      },

      //Relations 
      User: {
        posts: (parent: User) => posts.filter(p => p.userId === parent.id)
      },
      Post: {
        user: (parent: Post) => users.find(u => u.id === parent.userId)!
      }
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
    console.log("GraphQL Playground at http://localhost:3000/graphql");
  });
}

start();
