import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import buildSchema from './schema';

(async () => {
  const prismaOptions: any =
    process.env.NODE_ENV === 'dev' ? { log: ['query'] } : {};
  const prisma = new PrismaClient(prismaOptions);

  const app = express();
  const schema = await buildSchema();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }) => ({
      req,
      res,
      prisma: prisma,
    }),
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
})().catch((err) => console.log(err.message));
