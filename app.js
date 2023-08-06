const express = require("express");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

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

        // Build the HTML for the result container
        const resultHtml = `
          <div class="result-container" id="result-container">
            <p>The weather in ${place} is currently ${wed}</p>
            <h1>The temperature is ${temp}</h1>
            <p>Weather description is ${wed}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Pressure: ${pressure} hPa</p>
            <img src="${imageicon}">
          </div>
        `;

        // Send the HTML response with the result container
        res.send(resultHtml);
      });
    }
  );
});

app.listen(6010, function () {
  console.log("server ******* is running");
});

