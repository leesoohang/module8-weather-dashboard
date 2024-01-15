// click event when weather info shows up


$("#search-button").click( function(event) {
    event.preventDefault();
var city = $("#search-input").val()
var current = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=fd62aede53b324434c4bed0886f183e0&q=" + city


// click event when buttons (btn btn-secondary) generated in #history div
var history = $("<button>");
history.addClass("btn btn-secondary mb-2");

if (city) {
    $("#history").append(history);
} else {
    alert("Please input!")
}

// retrieve data from Current Weather API
fetch(current).then( function(response) {
    return response.json()
}).then( function(today) {
    var city = today.name;
    var date = dayjs().format("DD MMM YYYY");
    var temp = today.main.temp;
    var wind = today.wind.speed;
    var humidity = today.main.humidity;
    var icon = today.weather[0].icon
    history.text(city);    
    console.log(city + "\n" + date + "\nTemperature: " + temp + "℃" + "\nWind speed: " + wind + "kph" + "\nHumidity: " + humidity + "%");
    $("#today").empty();
    
// create current weather component
    $("#today").append("<div class='card' id='current'>");
    $("#current").append("<div class='card-body'><div class='card-text' id='current-item'>");
    
    $("#current-item").append("<h2 class='fw-bold'>" + city + " (" + date + ") " + "<img src='https://openweathermap.org/img/wn/" + icon + ".png'>")
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
// select 12 noon weather data as forecast of the day
    for (i = 0; i < 5; i++) {
        array = future[];
        if ((future[i].dt).includes("12:00:00")) {
             array = future[i]
            return future;
            
        }
        // return arrays of 5 day forecast
       
       
        console.log(array);
    $("#forecast-group").empty();
    var date = dayjs().format("DD MMM YYYY");
    var temp = future[5].main.temp;
    var wind = future[5].wind.speed;
    var humidity = future[5].main.humidity;
    var icon = future[5].weather[0].icon;
    // console.log(future);
// empty cards so there won't be duplicate results 
} 
// create forecast card group component
    $("#forecast-group").append("<div class='col'><div class='card'><div class='card-body' id='future'>");
    $("#future").append("<h3 class='card-title'>" + date);
    $("#future").append("<p class='card-text'>" + "<img src='https://openweathermap.org/img/wn/" + icon + ".png'>" +
    "<p> Temp: " + temp + "℃" + 
    "<p> Wind: " + wind + " kph" + 
    "<p> Humidity: " + humidity + " %");
   
}
)
}


)
