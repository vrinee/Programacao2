// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === 'Invalid Date';

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date);
  let URL = req.originalUrl;
  let params = new URLSearchParams(URL.split('?')[1]);
  let utc = params.get('utc');
  console.log(utc);

  if (isInvalidDate(date)) {
    date = new Date(+req.params.date);
  }
  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }
  if (utc !== null) {
    date = new Date(date.getTime() + (3600000 * utc));
    if (isInvalidDate(date)) {
      res.json({ error: "Invalid Date" });
      return;
    }
  }
  res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  });


app.get("/api", function (req, res) {
  let date = new Date();

  res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
);

app.get("/api/diff/:date1/:date2", function (req, res) {
  let date1 = new Date(req.params.date1);
  let date2 = new Date(req.params.date2);
 
  if (isInvalidDate(date1) || isInvalidDate(date2)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  let diff = Math.abs(date1 - date2);
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff = diff - (days * 1000 * 60 * 60 * 24);
  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff = diff - (hours * 1000 * 60 * 60);
  let minutes = Math.floor(diff / (1000 * 60));
  diff = diff - (minutes * 1000 * 60);
  let seconds = Math.floor(diff / 1000);

  res.json(
    {
      data1: date1.toUTCString(),
      data2: date2.toUTCString(),
      diferenca: {
        dias: days,
        horas: hours,
        minutos: minutes,
        segundos: seconds
      }
    }

  )
}
);



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
