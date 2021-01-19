const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
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

const convertToUTC = (date) => {
  return moment.utc(date)._d;
};

const getDataFromDate = async (date) => {
  return await currencies
    .find({
      Date: { $eq: new Date(date) },
    })
    .lean();
};

const getClosePriceFromDate = (date) =>
  date.map((item) => Number(item.Close.replace(/,/g, "")));

const calculatePriceDifferenceBetweenDates = (startDate, endDate) => {
  return endDate.map((value, index) => {
    return (((startDate[index] - value) * 100) / value).toFixed(1) + " %";
  });
};

const getPriceDifferenceFor = async (date, number, unit) => {
  const dataSelectedDate = await getDataFromDate(date);
  const priceSelectedDate = getClosePriceFromDate(dataSelectedDate);

  const numberOfUnitBefore = await moment(date).subtract(number, unit)._d;
  const dataNumberOfUnitBefore = await getDataFromDate(numberOfUnitBefore);
  const priceNumberOfUnitBefore = getClosePriceFromDate(dataNumberOfUnitBefore);
  return calculatePriceDifferenceBetweenDates(
    priceNumberOfUnitBefore,
    priceSelectedDate
  );
};

router.get("/", async (req, res) => {
  try {
    if (!req.query.date) return res.sendStatus(400);

    const date = convertToUTC(req.query.date);
    const dataSelectedDate = await getDataFromDate(date);

    const priceDifference1Day = await getPriceDifferenceFor(date, 1, "day");
    const priceDifference7Days = await getPriceDifferenceFor(date, 7, "day");
    const priceDifference1Month = await getPriceDifferenceFor(date, 1, "month");

    const response = dataSelectedDate
      .map((value, index) => {
        return {
          ...value,
          "24h": priceDifference1Day[index],
          "7d": priceDifference7Days[index],
          "1m": priceDifference1Month[index],
        };
      })
      .sort(
        (a, b) =>
          Number(b["Market Cap"].replace(/,/g, "")) -
          Number(a["Market Cap"].replace(/,/g, ""))
      );

    res.status(200).send(response);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
