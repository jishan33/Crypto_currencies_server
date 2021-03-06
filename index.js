const mongoose = require("mongoose");
const cors = require("cors");
const dbDebugger = require("debug")("app:db");
const express = require("express");
const app = express();
const cryptoCurrencies = require("./app/cryptoCurrencies");

mongoose
  .connect("mongodb://localhost/code_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => dbDebugger("Connected to MongoDB..."))
  .catch((err) => dbDebugger("Could not connect to MongoDB...", err.message));

app.use(cors());
app.use(express.json());
app.use("/crypto_currencies", cryptoCurrencies);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

