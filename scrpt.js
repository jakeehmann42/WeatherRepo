let APIKey = "42f4d6607b1c74e26f1d1ad6dfd9ca1b";

let lat = "32.253460";
let lon = "-110.9747";

let userSearch = "";


// date
let currentDate = moment().format("L");

let forcastDays = ["1", "2", "3", "4", "5"]


// https://openweathermap.org/api/one-call-api source for "&units=imperial"

function forecastSearch(lat, lon, forecast) {
    let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=part" + "&appid=" + APIKey + "&units=imperial";


    // ajax call for city search
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        let currentCondition = response.current.weather[0].description;

        $(".card-conditions").text("Conditions: " + currentCondition);

        $(".icons").attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");

        $(".card-subtitle").text(response.current.temp + " \u00B0 F");

        $(".card-text").text("Humidity: " + response.current.humidity + " %");

        $(".card-wind").text("Wind Speed: " + response.current.wind_speed + " mph");
        // UV index color that indicates whether the conditions are favorable, moderate, or severe
        let uvButton = $("<button>").text(response.current.uvi);

        if (response.current.uvi < 3) {
            uvButton.addClass("btn btn-success");


        } else if (response.current.uvi < 7) {
            uvButton.addClass("btn btn-warning");

        } else {
            uvButton.addClass("btn btn-danger");

        }
        // clears button and appneds new button
        $("#uv-text").empty();

        $("#uv-text").append(uvButton);

        // console.log(response.daily);
        $("#forecast").empty();

        for (let i = 0; i < 5; i++) {
            let dailyForecast = response.daily[i];

            let condition = dailyForecast.weather[0].main;
            let currentTemperature = dailyForecast.temp.day;


            let currentHumidity = dailyForecast.humidity;
            let weatherIcons = $("<img>")
            weatherIcons.attr("src", "http://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png");
            // display date on forecast card
            let forecastTime = new Date(forecast.list[i].dt_txt).toLocaleDateString();


            let weatherCard = $("<div></div>").addClass("card col text-center");

            $("#forecast").append(weatherCard);

            let weatherBody = $("<div>").addClass("card-body");
            // weatherBody.attr();
            weatherBody.append(forecastTime);

            weatherBody.append($("<p>Conditions: " + condition + "</p>"));
            weatherBody.append($("<p>Temperature: " + currentTemperature + " \u00B0 F" + "</p>"));
            weatherBody.append($("<p>Humidity: " + currentHumidity + " %</p>"));
            weatherBody.append(weatherIcons);
            weatherBody.appendTo(weatherCard);

        };

    });
}


function cityForecast(cityName) {
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    $(".card-title").text(cityName + " " + " " + "(" + currentDate + ")");
    $.ajax({
        url: forecastURL,
        method: 'GET'
    }).then(function (forecast) {

        forecastSearch(forecast.city.coord.lat, forecast.city.coord.lon, forecast);

    });
}

cityForecast("Tucson");

// search button 
$('#search-button').on('click', function (e) {

    

    //save city name
    e.preventDefault();

    cityForecast($("#city-input").val());

    let searchedCity = $("#city-input").val();

    localStorage.setItem("cityentered", searchedCity);

    // localStorage.setItem("userSearch", searchedCity);

    let newButton = $("<button>").text(searchedCity);
    
    newButton.addClass("btn btn-info");

    $("#buttons").append(newButton);

})
