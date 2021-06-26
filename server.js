const express = require("express");
require("dotenv").config();
var pagination = require("./middilewares/pagination");
var posts = require("./posts.json");
var users = require("./users.json");
const mongoose = require("mongoose");
const Comment = require("./model/comments");

const app = express();

DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@trainingcluster.tpyei.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log("Error : ", error));

app.get("/posts", pagination.localPaginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/users", pagination.localPaginatedResults(users), (req, res) => {
  res.json(res.paginatedResults);
});

app.get(
  "/comments",
  pagination.MongoDBpaginatedResults(Comment),
  (req, res) => {
    res.json(res.paginatedResults);
  }
);

app.listen(3000);
