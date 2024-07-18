import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config";

import authRoutes from "./routes/auth";
require('dotenv').config();
const morgan = require("morgan");

const app = express();

mongoose.set("strictQuery", false); 
mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api", authRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
