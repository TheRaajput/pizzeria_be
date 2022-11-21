const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT | 5000;
//.................middlewares........................
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//..................Routes............................
app.use(require("./src/routes"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
//..................MONGO.............................
try {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lrhulzb.mongodb.net/pizzeria?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch (err) {
  console.log("Couldn't connect to Database");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
