import express from "express";
import { join } from "path";
import mongoose from "mongoose";
import { error, success } from "consola";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer } from "apollo-server-express";

import AppModels from "./models";
import { PORT, MONGODB_URI } from "./config";
import { resolvers, typeDefs } from "./graphql";

const app = express();
app.use(express.static(join(__dirname, "/uploads")));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    ...AppModels,
  },
});

const startServer = async () => {
  try {
    const { connections } = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    success({
      badge: true,
      message: `Successfully connected to database: ${connections[0].name}`,
    });

    await server.start();
    app.use(graphqlUploadExpress());
    server.applyMiddleware({ app });

    app.listen(PORT, () =>
      success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
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
