require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const bdInFuture = [
  {
    id: 1,
    username: 'Andrew',
    age: 27,
    posts: [
      {
        id: 100,
        title: 'Hello',
        content: 'Text Post',
      },
    ],
  },
];

const app = express();
app.use(cors());

const root = {
  getAllUsers: () => bdInFuture,
  getUser: ({ id }) => {
    bdInFuture.find((user) => user.id === id);
  },
};
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);
});
