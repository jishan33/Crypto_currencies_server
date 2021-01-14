const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const dbDebugger = require("debug")("app:db");
const moment = require("moment");

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
    type: String,
    required: true,
    min: 0,
  },
  High: {
    type: String,
    required: true,
    min: 0,
  },
  Low: {
    type: String,
    required: true,
    min: 0,
  },
  close: {
    type: String,
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
const adjustTime = (date) => {
  return moment(date).add(1, "day")._d;
};

const getDataFromDate = async (date) => {
  return await currencies.find({
    Date: { $gte: new Date(date), $lte: new Date(date) },
  }).lean();
};

const getOpenPriceFromDate = (date) =>
  date.map((item) => Number(item.Open.replace(/,/g, "")));

const calculatePriceDifferenceBetweenDates = (startDate, endDate) => {
  return endDate.map((value, index) => {
    return ((startDate[index] - value) / value).toFixed(1) + " %";
  });
};

router.get("/", async (req, res) => {
  try {
    const date = adjustTime(req.query.date);

    const oneDayBefore = moment(date).subtract(1, "day")._d;
    const sevenDaysBefore = moment(date).subtract(7, "day")._d;

    const currenciesData = await currencies.find();

    const dataSelectedDate = await getDataFromDate(date);
    const data1DayBefore = await getDataFromDate(oneDayBefore);
    const data7DaysBefore = await getDataFromDate(sevenDaysBefore);

    const priceSelectedDate = getOpenPriceFromDate(dataSelectedDate);
    const price1dayBefore = getOpenPriceFromDate(data1DayBefore);
    const price7DaysBefore = getOpenPriceFromDate(data7DaysBefore);

    const priceDifference7Days = await calculatePriceDifferenceBetweenDates(
      price7DaysBefore,
      priceSelectedDate
    );

    const priceDifference1Day = await calculatePriceDifferenceBetweenDates(
      price1dayBefore,
      priceSelectedDate
    );

    for (let i = 0; i < dataSelectedDate; i++) {
      (dataSelectedDate["24h"] = priceDifference1Day[i]),
        (dataSelectedDate["7d"] = priceDifference7Days[i]);
    }
    const response = dataSelectedDate.map((value, index) => {
      return {
        ...value,
        '24h': priceDifference1Day[index],
        '7d': priceDifference7Days[index]
      }
    });
    
    console.log(response);
    // var response = [
    //   {
    //     "currency": "litecoin",
    //     "price": 45.38,
    //     "24h":,
    //     "7d":,
    //     "24h Volume": ,
    //     "Market_Cap": ,
    //   }
    // ]

    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
