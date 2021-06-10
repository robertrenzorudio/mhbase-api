import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { context } from './context/context';
import buildSchema from './schema';

(async () => {
  const app = express();
  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: context,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`);
  });
})().catch((err) => console.log(err.message));
