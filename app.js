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
            measurement: 'airquality',
            fields: { lat: Influx.FieldType.FLOAT, long: Influx.FieldType.FLOAT, aqi: Influx.FieldType.FLOAT  },
            tags: [ 'city' ]
          }
        ]
      });


  const writeDataToInflux = (pollutionObj) => {
      if(pollutionObj.data === undefined || pollutionObj.data.location === undefined) {
        return;
      }

      influx.query(`
      DROP SERIES FROM "airquality" WHERE "city"="${pollutionObj.data.city}"
    `);
    // .then( result =>  )
    // .catch( error => console.log(error) );

      influx.writePoints([
        {
          measurement: 'airquality',
          tags: {city: pollutionObj.data.city},
          fields: { lat: pollutionObj.data.location.coordinates[1], long: pollutionObj.data.location.coordinates[0], aqi: pollutionObj.data.current.pollution.aqius },
          timestamp: Date.parse(pollutionObj.data.current.pollution.ts)/1000,
        }
      ], {
        database: 'MYDB',
        precision: 's',
      })
      .catch(error => {
        console.error(`Error saving data to InfluxDB! ${error.stack}`)
      });
    
  }
    //test code
  const writeTempDataToInflux = () => {
      influx.writePoints([
        {
          measurement: 'airquality',
          fields: { lat: 12.9716, long: 77.5946, aqi: 20, city: 'Bangalore'  },
        }
      ], {
        database: 'MYDB',
        precision: 's',
      })
      .catch(error => {
        console.error(`Error saving data to InfluxDB! ${error.stack}`)
      });
    
  }
  //writeTempDataToInflux();
  //https://docs.openaq.org/#api-Cities
  //GksyDPeahBHWXqtyH https://www.airvisual.com/dashboard/api
const callApi = () => {
  Request.get("https://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });
  Request.get("https://api.airvisual.com/v2/city?city=Port Harcourt&state=Rivers&country=Nigeria&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Berlin&state=Berlin&country=Germany&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Auckland&state=Queensland&country=Australia&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Kabul&state=Kabul&country=Afghanistan&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Barrie&state=Ontario&country=Canada&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Joensuu&state=North Karelia&country=Finland&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Beijing&state=Beijing&country=China&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Brest&state=Brittany&country=France&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Americana&state=Sao Paulo&country=Brazil&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Haifa&state=Haifa&country=Israel&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Moscow&state=Moscow&country=Russia&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });


  Request.get("https://api.airvisual.com/v2/city?city=Seogwipo&state=Jeju-do&country=South Korea&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  Request.get("https://api.airvisual.com/v2/city?city=Ra's al Khaymah&state=Ra's al Khaymah&country=United Arab Emirates&key=GksyDPeahBHWXqtyH", (error, response, body) => {
      if(error) {
          return console.log(error);
      }
      
      let jsonObj = JSON.parse(body);
      writeDataToInflux(JSON.parse(body));
     // console.log(JSON.parse(body));
  });

  console.log("200 : success");
  setTimeout(callApi, 60000);
}

callApi();
