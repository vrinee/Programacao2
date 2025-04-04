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


app.get("/api/:date", function (req, res) {//api para pegar data
  let date = new Date(req.params.date);//pega a data do parametro
  let URL = req.originalUrl;//pega a url original
  let params = new URLSearchParams(URL.split('?')[1]);//transforma a url após ? em parametros
  let utc = params.get('utc');//pega o parametro utc(fuso)
  console.log(utc);//testa a variavel

  if (isInvalidDate(date)) {// verifica se a data é valida
    date = new Date(+req.params.date); //tenta converter a string para um numero
  }
  if (isInvalidDate(date)) {//verifica novamente se é valida
    res.json({ error: "Invalid Date" });//devolve json de erro
    return;
  }
  if (utc !== null) {//verifica se o parametro utc existe
    date = new Date(date.getTime() + (3600000 * utc));//converte a data para o fuso horario
    if (isInvalidDate(date)) {//verifica novamente se é valida e envia json de erro caso for
      res.json({ error: "Invalid Date" });
      return;
    }
  }
  res.json({//json de resposta
      unix: date.getTime(),
      utc: date.toUTCString() + " " + utc ,
    });
  });


app.get("/api", function (req, res) {//api para pegar data atual
  let date = new Date();//pega a data atual

  res.json({//json de resposta
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
);

app.get("/api/diff/:date1/:date2", function (req, res) {//api para fazer a diferença entre datas(não suporta fuso)
  let date1 = new Date(req.params.date1);//pega a primeira data
  let date2 = new Date(req.params.date2);//pega a segunda data
 
  if (isInvalidDate(date1) || isInvalidDate(date2)) {//verifica se as datas são validas
    res.json({ error: "Invalid Date" });//json de erro
    return;
  }

  let diff = Math.abs(date1 - date2);//realiza as operações de diferença entre as datas
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));//dias
  diff = diff - (days * 1000 * 60 * 60 * 24);//atualiza diferenca
  let hours = Math.floor(diff / (1000 * 60 * 60));//horas
  diff = diff - (hours * 1000 * 60 * 60);//atualiza diferenca
  let minutes = Math.floor(diff / (1000 * 60));//minutos
  diff = diff - (minutes * 1000 * 60);//atualiza diferenca
  let seconds = Math.floor(diff / 1000);//segundos

  res.json(//json de resposta
    {
      data1: date1.toUTCString(),//data1
      data2: date2.toUTCString(),//data2
      diferenca: {//diferenca entre as datas
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
