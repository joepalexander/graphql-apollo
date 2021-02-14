require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");

const dbInFuture = [
  {
    id: 1,
    username: "Andrew",
    age: 27,
    posts: [
      {
        id: 100,
        title: "Hello",
        content: "Text Post",
      },
    ],
  },
];

const app = express();
app.use(cors());

const root = {
  getAllUsers: () => dbInFuture,
  getUser: ({ id }) => {
    dbInFuture.find((user) => user.id === id);
  },
  createUser: ({ input }) => {
    const user = {
      id: Date.now(),
      username: input.username,
      age: input.age,
    };
    dbInFuture.push(user);
    return user;
  },
};
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);
});
