const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose.connect("mongodb+srv://ali:ali123@cluster0.tkimmwk.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(8000, () => {
  console.log("Server running on port 8000");
});