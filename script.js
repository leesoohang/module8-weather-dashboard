var cities = [];
// get curernt weather and forecast
function getWeather(city) {

var current = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=fd62aede53b324434c4bed0886f183e0&q=" + city


// retrieve data from Current Weather API
fetch(current).then( function(response) {
    return response.json()
}).then( function(today) {
    var city = today.name;
    var date = dayjs().format("DD MMM YYYY");
    var temp = today.main.temp;
    var wind = today.wind.speed;
    var humidity = today.main.humidity;
    var icon = today.weather[0].icon;
// stop adding existing cities to history
    var prevSearch = cities.includes(city);
    if (!prevSearch) {
        cities.push(city)
        cityHistory();
        addHistory(city);
    }

    $("#today").empty();
   
// create current weather component
    $("#today").append("<div class='card' id='current'>");
    $("#current").append("<div class='card-body'><div class='card-text' id='current-item'>");
    
    $("#current-item").append("<h3 class='fw-bold' value='"+ city+ "'>" + city + " (" + date + ") " + "<img src='https://openweathermap.org/img/wn/" + icon + ".png'>")
    $("#current-item").append("<p> Temp: " + temp + "℃" + 
    "<p> Wind: " + wind + " kph" + 
    "<p> Humidity: " + humidity + " %");
   
   
})

    var forecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=fd62aede53b324434c4bed0886f183e0&q=" + city;
// retrieve data from 5 Day Weather Forecast API
fetch(forecast).then( function(response) {
    return response.json()
}).then( function(future) {
    var future = future.list;
// choose the data of every 8th item of the forecast to get data from every 12 hours
    var timeDay = [7,15,23,31,39]
      $("#forecast-group").empty();  
    for (i = 0; i < 5; i++) {

    var date = dayjs.unix(future[timeDay[i]].dt).format("DD MMM YYYY");
    var temp = future[timeDay[i]].main.temp;
    var wind = future[timeDay[i]].wind.speed;
    var humidity = future[timeDay[i]].main.humidity;
    var icon = future[timeDay[i]].weather[0].icon;

// create forecast card group component
    $("#forecast-group").append("<div class='col'><div class='card bg-primary-subtle'><div class='card-body'>" +
    "<h5 class='card-title'>" + date + 
    "<p><img src='https://openweathermap.org/img/wn/" + icon + ".png'>" +
    "<p class='card-text'> Temp: " + temp + "℃" + 
    "<p class='card-text'> Wind: " + wind + " kph" + 
    "<p class='card-text'> Humidity: " + humidity + " %");
}
})
}

// display weather data when clicking search
$("#search-button").click( function(event) {
    event.preventDefault();
    var cityInput = $("#search-input").val()
    getWeather(cityInput);
    }
)

// listing all recent searches available for clicking
function addHistory(city) {
    var history = $("<button>");
    history.addClass("btn btn-secondary mb-2 city");
    history.attr("value", city);
    history.text(city);
    $("#history").append(history);
    $(".city").click( function() {
       var city = $(this).attr("value")
        getWeather(city);
    });      
}


// set up local storage by storing cities searched in an array
function cityHistory() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

function loadCities() {
    var citiesLoaded = localStorage.getItem("cities")
    if(!citiesLoaded) {
        return false;
    }
    citiesLoaded = JSON.parse(citiesLoaded);
    
    for (j = 0; j < citiesLoaded.length; j++) {
        addHistory(citiesLoaded[j])
        cities.push(citiesLoaded[j])
    }
}

  

loadCities();
