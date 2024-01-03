const express = require("express");
const userRoutes = require("./modules/users")
const user = require("./config");

const app = express();
app.use(express.json());

app.use("/users", userRoutes());

app.listen(4000 ,()=> {console.log("http://localhost:4000");})