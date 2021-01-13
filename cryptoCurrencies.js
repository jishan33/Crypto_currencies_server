const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const dbDebugger = require("debug")("app:db");

const cryptoCurrenciesSchema = new mongoose.Schema({
  Currency: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  Date: {
    type: Date,
    required: true,
  },
  Open: {
    type: Number,
    required: true,
    min: 0,
  },
  High: {
    type: Number,
    required: true,
    min: 0,
  },
  Low: {
    type: Number,
    required: true,
    min: 0,
  },
  close: {
    type: Number,
    required: true,
    min: 0,
  },
  Volume: {
    type: String,
    required: true,
    minLength: 1,
  },
  Market_Cap: {
    type: String,
    required: true,
    minLength: 1,
  },
});

const currencies = mongoose.model("Crypto_currencies", cryptoCurrenciesSchema);

router.get("/", async (req, res) => {
  try{
  const currenciesData = await currencies.find();

  res.send(currenciesData);}
  catch(err){
    console.error(err)
  }
});

module.exports = router;
