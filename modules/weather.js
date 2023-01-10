let weather = {
    
    wkey: "935b14419a4fc018055b0cda8fb760d9",

    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city+
        "&units=metric&appid="
        +this.wkey)
        .then((res) => res.json)
        .then((weather) => this.displayWeather(weather))
    },
    displayWeather: function(weather){
        const {name} = weather;
        const {icon, description} = weather.weather[0];
        const {temp} = weather.main;
        const {speed} = weather.wind
        console.log(name, temp, description, icon, speed)
    }
}