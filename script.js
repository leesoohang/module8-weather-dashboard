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
    var timeDay = [7,15,23,31,39]
      $("#forecast-group").empty();  
    for (i = 0; i < 5; i++) {

    var date = dayjs.unix(future[timeDay[i]].dt).format("DD MMM YYYY");
    var temp = future[timeDay[i]].main.temp;
    var wind = future[timeDay[i]].wind.speed;
    var humidity = future[timeDay[i]].main.humidity;
    var icon = future[timeDay[i]].weather[0].icon;
    console.log(future[timeDay[i]]);
// empty cards so there won't be duplicate results 
 
// create forecast card group component
 

    $("#forecast-group").append("<div class='col'><div class='card' id='daily'><div class='card-body'>" +
    "<h2 class='card-title'>" + date + 
    "<p><img src='https://openweathermap.org/img/wn/" + icon + ".png'>" +
    "<p class='card-text'> Temp: " + temp + "℃" + 
    "<p class='card-text'> Wind: " + wind + " kph" + 
    "<p class='card-text'> Humidity: " + humidity + " %");

}
        

        }
)
})


