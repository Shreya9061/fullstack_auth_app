const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use(cors());//CORS ORIGIN RESOURCE SHARING
app.use("/api/v1/users",userRoutes);
module.exports = app;