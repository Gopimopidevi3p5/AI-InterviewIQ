import dns from "node:dns"; // or const dns = require('node:dns');

// Overrides the broken internal v24 resolver
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import dotenv from "dotenv";
dotenv.config();    

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/auth", authRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
