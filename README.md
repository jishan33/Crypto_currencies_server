# Crypto_currencies_server

## See Also
Frontend available [here](https://github.com/jishan33/Crypto_currencies_cilent)

## Pre-requisites
 - [NodeJS](https://nodejs.org/en/download/) (v12.13.1)
 - [MongoDB](https://www.mongodb.com/) (v4.4.2)
 
 ## Running the app
 - `npm install` to install dependencies
 - `npm start` starts the app (note: assumes [MongoDB](https://www.mongodb.com/) is running with data loaded)
 - `npm test` to run tests (assumes app is running)
 
 ## Key Libraries Used
 - [Express](https://expressjs.com/) REST backend framework
 - [Mocha](https://mochajs.org/) Test framework
 - [Chai](https://www.chaijs.com/) Test assertions library
 - [Mongoose](https://mongoosejs.com/) MongoDB library

### Data Pre-requisites
NOTE: When uploading provided data to mongo, dates are assumed to be in UTC (Ie, `Dec 04 2019` corresponds to the ISO time `2019-12-04T00:00:00.000+00:00`)

## Assumptions
See [frontend](https://github.com/jishan33/Crypto_currencies_cilent/blob/master/README.md#assumptions)
