// click event when weather info shows up
$("#search-button").click( function(event) {
    event.preventDefault();

const city = $("#search-input").val()
var current = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=fd62aede53b324434c4bed0886f183e0&q=" + city
var forecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=fd62aede53b324434c4bed0886f183e0&q=" + city

// click event when buttons (btn btn-secondary) generated in #history div
var history = $("<button>");
history.addClass("btn btn-secondary mb-2");
history.text(city);


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
    
    console.log(city + "\n" + date + "\nTemperature: " + temp + "℃" + "\nWind speed: " + wind + "kph" + "\nHumidity: " + humidity + "%");

// create current weather component
    $("#today").append("<div class='card' id='current'>");
    $("#current").append("<div class='card-body'>");
    
    $(".card-body").append("<h2 class='fw-bold'>" + city + " (" + date + ") " + "<img src='https://openweathermap.org/img/wn/" + icon + ".png'>")
    // $(".card-body").append("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'>");
    $(".card-body").append("<p> Temp: " + temp + "℃" + 
    "<p> Wind: " + wind + " kph" + 
    "<p> Humidity: " + humidity + " %");
})

// retrieve data from 5 Day Weather Forecast API
fetch(forecast).then( function(response) {
    return response.json()
}).then( function(future) {
    var future = future.list[i]
    var date = dayjs().format("DD MMM YYYY");
    var temp = future.main.temp;
    var wind = future.wind.speed;
    var humidity = future.main.humidity;
    var icon = future.weather[0].icon
    
    console.log(city + "\n" + date + "\nTemperature: " + temp + "℃" + "\nWind speed: " + wind + "kph" + "\nHumidity: " + humidity + "%");

// create current weather component
    $("#today").append("<div class='card' id='current'>");
    $("#current").append("<div class='card-body'>");
    
    $(".card-body").append("<h2 class='fw-bold'>" + city + " (" + date + ") " + "<img src='https://openweathermap.org/img/wn/" + icon + ".png'>")
    // $(".card-body").append("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'>");
    $(".card-body").append("<p> Temp: " + temp + "℃" + 
    "<p> Wind: " + wind + " kph" + 
    "<p> Humidity: " + humidity + " %");
    
})


}

)

