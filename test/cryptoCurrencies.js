const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

describe("CryptoCurrencies Api", () => {
  var url = "http://localhost:5000";
  describe("Test Get route /crypto_currencies", () => {
    it("It should return corresponding crypto currencies data to the date", (done) => {
      chai
        .request(url)
        .get("/crypto_currencies?date=2019-12-04")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.not.be.eq(0);

          done();
        });
    });

    it("It should not return data without a date", (done) => {
      chai
        .request(url)
        .get("/crypto_currencies")
        .end((err, response) => {
          response.should.have.status(400);

          done();
        });
    });
  });
});
