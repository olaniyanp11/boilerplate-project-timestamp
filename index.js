// index.js
// where your node app starts
// if (process.env.NODE_ENV === "development") {
// require("dotenv").config();

// }
let check = require("./auth/check");

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(check);
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
    try {
      let reqdate = req.params.date;
      let finaldate = { unix: null, utc: null };
      if (reqdate.length === 13) {
        reqdate = Number(reqdate);
      }

      reqdate = new Date(reqdate);
      finaldate.unix = reqdate.getTime();
      finaldate.utc = reqdate.toUTCString();
    } catch (error) {
      finaldate = { error: "Invalid Date" };
    }
  res.json(finaldate);
});
app.get("/api", (req, res) => {
  let finaldate = { unix: null, utc: null };
  reqdate = new Date();
  finaldate.unix = reqdate.getTime();
  finaldate.utc = reqdate.toUTCString();
  res.json(finaldate);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
