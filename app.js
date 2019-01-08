var Request = require("request");
const Influx = require('influx');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'MYDB',
  schema: [
    {
      measurement: 'currency',
      fields: { USD: Influx.FieldType.FLOAT, AUD: Influx.FieldType.FLOAT },
      tags: []
    }
  ]
});

const writeDataToInflux = (currencyObj) => {
    influx.writePoints([
      {
        measurement: 'currency',
        fields: { USD: currencyObj.rates.USD, AUD: currencyObj.rates.AUD },
        timestamp: currencyObj.epoch,
      }
    ], {
      database: 'MYDB',
      precision: 's',
    })
    .catch(error => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`)
    });
  
}

//https://docs.openaq.org/#api-Cities
Request.get("https://api.openaq.org/v1/measurements?city=Namur", (error, response, body) => {
    if(error) {
        return console.log(error);
    }
    //writeDataToInflux(JSON.parse(body));
    console.log(JSON.parse(body));
});