const express = require("express");
const api = express.Router();
const request = require("request");
const options = {
  url: 'https://api.apiopen.top/getJoke?page=1&count=2&type=video'
};

api.get("/", (req, res) => {
  request.get(options, (err, response) => {
    const data = response.body;
    res.send(data);
  });
});

api.post("/", function (req, res) {
  res.send("post");
});

api.put("/", function (req, res) {
  res.send("put");
});

api.delete("/", function (req, res) {
  res.send("delete");
});

module.exports = api;
