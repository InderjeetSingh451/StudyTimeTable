const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboards");

app.use("/api/auth", authRoutes);
app.use("/api/dashboards", dashboardRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connected");
    app.listen(PORT, () => console.log("Server running on", PORT));
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
  });
