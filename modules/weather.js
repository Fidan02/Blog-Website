let weather = {
    "wkey": "935b14419a4fc018055b0cda8fb760d9",

    fetchWeather: function() {
        fetch("https://pro.openweathermap.org/data/2.5/weather?q=Denver&units=metric&appid=935b14419a4fc018055b0cda8fb760d9")
        .then((res) => res.json)
        .then((weather) => console.log(weather))
    }
}