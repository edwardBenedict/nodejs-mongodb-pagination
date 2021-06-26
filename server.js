const express = require("express");
var pagination = require("./middilewares/pagination");
var posts = require("./posts.json");
var users = require("./users.json");

const app = express();

app.get("/posts", pagination.paginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/users", pagination.paginatedResults(users), (req, res) => {
  res.json(res.paginatedResults);
});

app.listen(3000);
