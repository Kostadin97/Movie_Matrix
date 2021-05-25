const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const mongoURI =
  // "mongodb+srv://admin:admin@cluster.6ztzo.mongodb.net/movie_matrix?retryWrites=true&w=majority";
  "mongodb://localhost:27017/movie-matrix";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`MongoDB Connected`);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("client/build"));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/comment", require("./routes/comment"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running at ${PORT}`));
