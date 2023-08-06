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

      let weatherData = "";
      response.on("data", function (data) {
        weatherData += data;
      });

      response.on("end", function () {
        weatherData = JSON.parse(weatherData);
        console.log(weatherData);

        const name = weatherData.name;
        const main = weatherData.weather[0].main;
        const description = weatherData.weather[0].description;
        const temp = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const tempMin = weatherData.main.temp_min;
        const tempMax = weatherData.main.temp_max;
        const pressure = weatherData.main.pressure;
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
        const icon = weatherData.weather[0].icon;
        const imageicon =  "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        // Build the HTML for the result container
        const resultHtml = `
          <div class="result-container" id="result-container">
            <h2>Weather in ${name}</h2>
            <p>Main Weather: ${main}</p>
            <p>Description: ${description}</p>
            <p>Temperature: ${temp} °C</p>
            <p>Feels Like: ${feelsLike} °C</p>
            <p>Min Temperature: ${tempMin} °C</p>
            <p>Max Temperature: ${tempMax} °C</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Sunrise: ${sunrise}</p>
            <p>Sunset: ${sunset}</p>
            <img src="${imageicon}" alt="Weather Icon">
          </div>
        `;

        // Send the HTML response with the result container
        res.send(resultHtml);
      });
    }
  );
});

app.listen(9700, function () {
  console.log("server is running on port 9700");
});




