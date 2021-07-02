import { ApolloServer } from 'apollo-server-express';
import { prisma } from './db';
import express from 'express';
import getSchema from './schema';
import { redis } from './redis/redis';

(async () => {
  const app = express();
  const schema = await getSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
      prisma,
      redis,
    }),
    playground: true,
    introspection: true,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT || 4000;
  app.use('/', (_: express.Request, res: express.Response) => {
    res.redirect(302, '/graphql');
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`);
  });
})()
  .catch((err) => console.log(err.message))
  .finally(async () => prisma.$disconnect());
