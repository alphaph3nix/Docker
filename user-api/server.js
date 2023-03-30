const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/users", (req, res) => {
  res.json([
    {
      name: "zack",
      age: 29,
      gender: "MALE",
    },
    {
      name: "nacer",
      age: 25,
      gender: "MALE",
    },
    {
      name: "nassim",
      age: 29,
      gender: "MALE",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
