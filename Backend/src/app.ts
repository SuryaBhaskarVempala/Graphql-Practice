import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { createApolloServer } from "./graphql/index";


const app = express();
import dotenv from "dotenv";
import { connectDB, sequelize } from "./lib/db";
dotenv.config();


async function start() {
  app.use(cors(), express.json());

  
  await connectDB();
  // Sync models
  await sequelize.sync({ alter: true });
  console.log("All models synchronized");


  //graphql endpoints
  app.use("/graphql", expressMiddleware(await createApolloServer()));


  app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
    console.log("GraphQL Playground at http://localhost:3000/graphql");
  });

}

start();