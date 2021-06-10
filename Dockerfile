FROM node:15

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./yarn.lock ./

RUN yarn

COPY . .

COPY .env.prod .env

RUN yarn build

RUN npx prisma generate

EXPOSE 4000

CMD ["yarn", "start"]