
const express = require("express");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
 
// ... Existing code ...

app.post("/", function (req, res) {
  const place = req.body.cityname;
  const appkey = "fdcb5b9745097d2dc601e7663dca0bed";
  https.get(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      place +
      "&units=metric&appid=" +
      appkey,
    function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        console.log(data);
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const wed = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const pressure = weatherData.main.pressure;
        const imageicon =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p>The weather in " + place + " is currently " + wed + "</p>");
        res.write("<h1>The temperature is " + temp + "</h1>");
        res.write("<p>Weather description is " + wed + "</p>");
        res.write("<p>Humidity: " + humidity + "%</p>");
        res.write("<p>Wind Speed: " + windSpeed + " m/s</p>");
        res.write("<p>Pressure: " + pressure + " hPa</p>");
        res.write('<img src="' + imageicon + '">');
        res.end();
      });
    }
  );
});

// ... Rest of the code ...


/* app.post("/", function (req, res) {
  const place = req.body.cityname;
  const appkey = "fdcb5b9745097d2dc601e7663dca0bed";
  https.get( "https://api.openweathermap.org/data/2.5/weather?q=" +
      place + "&units=metric&appid=" + appkey,
    function (response) {
      console.log(response.statusCode);

      response.on("data", function (data) {
        console.log(data);
        const we = JSON.parse(data);
        console.log(we);
        const temp = we.main.temp;
        const wed = we.weather[0].description;
        const icon = we.weather[0].icon;
        const imageicon =
          " https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p>The weather in " + place + " is currently " + wed + "</p> ");
        res.write( " <h1>The temperature is " + temp + "</p>  Weather description is " + wed + "</h1>"
        );
        res.write(" <img src =" + imageicon + ">");
        res.end();
      });
    }
  );
});*/

app.listen(6010, function () {
  console.log("server ******* is running");
});
