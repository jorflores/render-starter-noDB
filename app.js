const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const users = [
  {
    id: 1,
    name: "Alex",
    password: "19d891bd718cf2959f662c918afc6f99",
  },
  {
    id: 2,
    name: "Sam",
    password: "e74c4fe7acffe8f6ce5974684a5d3aff",
  },
  {
    id: 3,
    name: "John",
    password: "6981b36b0f2d5c55ea73ad7c8c8d311c",
  }
]; 

app.get("/", (req, res) => res.send('<h1> Welcome api webserver</h1>').status(200));

app.get("/api/users", (req, res) => res.json(users).status(200));

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1; 
  users.push(newUser); 
  res.json(newUser).status(200);
});


app.post("/api/login", (req, res) => {
  const { name, password } = req.body;

  const user = users.find((user) => user.name === name && user.password === password);

  if (user) {
    user.token = "1234567890";
    res.json(user).status(200);
  } else {
    res.status(401).send("Invalid name or password");
  }
});




const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

