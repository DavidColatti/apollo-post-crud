import { error, success } from "consola";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { PORT } from "./config";
import { resolvers, typeDefs } from "./graphql";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {},
});

const startApp = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    success({
      badge: true,
      message: `Server started on http://localhost:${PORT}/graphql`,
    })
  );
};

startApp();
