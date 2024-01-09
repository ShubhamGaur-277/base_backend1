require('dotenv').config();

const express = require("express");
const userRoutes = require("./modules/users")
const adminRoutes = require("./modules/admin")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes());
app.use("/admin", adminRoutes());

app.listen(4000 ,()=> {console.log("http://localhost:4000");})