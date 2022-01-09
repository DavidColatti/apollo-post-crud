import express from "express";
import mongoose from "mongoose";
import { error, success } from "consola";
import { ApolloServer } from "apollo-server-express";

import * as AppModels from "./models";
import { PORT, MONGODB_URI } from "./config";
import { resolvers, typeDefs } from "./graphql";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    ...AppModels,
  },
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    success({
      badge: true,
      message: `Successfully connected with the Database.`,
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      success({
        badge: true,
        message: `Server started on http://localhost:${PORT}/graphql`,
      })
    );
  } catch (err) {
    error({
      badge: true,
      message: err.message,
    });
  }
};

startServer();
