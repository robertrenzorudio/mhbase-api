import { ApolloServer } from 'apollo-server-express';
import { prisma } from './db';
import express from 'express';
import buildSchema from './schema';

(async () => {
  const app = express();
  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
      prisma: prisma,
    }),
    playground: true,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT || 4000;
  app.use('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`🚀 Server ready at: http://localhost:${port}`);
  });
})()
  .catch((err) => console.log(err.message))
  .finally(async () => prisma.$disconnect());
