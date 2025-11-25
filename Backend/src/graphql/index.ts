
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServer } from "@apollo/server";
import {UserIndex} from "./user/index"


export async function createApolloServer() {
  const server = new ApolloServer({
    typeDefs: `
            ${UserIndex.types}

            type Query {
                ${UserIndex.queries}
            }

            type Mutation {
                ${UserIndex.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...UserIndex.resolvers.Queries
      },
      Mutation: {
        ...UserIndex.resolvers.Mutations
      },

      //Relations 
      User: {
        ...UserIndex.resolvers.User
      },
      Post: {
        ...UserIndex.resolvers.Post
      }
    },
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  });

  await server.start();

  return server;
}
