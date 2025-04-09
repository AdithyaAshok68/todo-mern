const express = require("express");
const cors = require("cors");
const { CONSTANT } = require("./utils/constant");
var mongoose = require("mongoose");
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());

const mongoUrl = CONSTANT.MONGODB_URI;
const port = CONSTANT.PORT;


// Middleware to disable caching
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

const todo = require("./routes/todo"); 

app.use("/api/todos", todo); 

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to mongoDb!");
    app.listen(port, () => {
      console.log(`node api app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", console.log(error));
  });
