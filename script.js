const apiKey = '82250fb6b67c14c67dfa28fb3807f6d2';
let currentUnit = 'metric'; 
let temperatureInCelsius = null;

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('windSpeed').innerText = (data.wind.speed * 3.6).toFixed(1); // convert m/s to km/h
            document.getElementById('description').innerText = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            document.getElementById('weatherIcon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather icon">`;

            temperatureInCelsius = data.main.temp;
            updateTemperature();
            changeBackground(); 

            document.getElementById('weatherDetails').classList.remove('hidden');
            document.getElementById('error').classList.add('hidden');
        } else {
            document.getElementById('error').innerText = 'City not found!';
            document.getElementById('error').classList.remove('hidden');
            document.getElementById('weatherDetails').classList.add('hidden');
        }
    } catch (error) {
        console.error('Error fetching the weather data', error);
        document.getElementById('error').innerText = 'Error fetching the weather data!';
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('weatherDetails').classList.add('hidden');
    }
}

function toggleTemp() {
    if (currentUnit === 'metric') {
        currentUnit = 'imperial'; 
    } else {
        currentUnit = 'metric'; 
    }
    getWeather(); 
}

function updateTemperature() {
    let tempText = '';
    if (currentUnit === 'metric') {
        tempText = `${temperatureInCelsius}°C`;
    } else {
        const temperatureInFahrenheit = (temperatureInCelsius * 9 / 5) + 32;
        tempText = `${temperatureInFahrenheit.toFixed(1)}°F`;
    }
    document.getElementById('temperature').innerText = tempText;
}

function changeBackground() {
    if (temperatureInCelsius < 9) {
        document.body.style.backgroundImage = "url('ice_background.jpg')";
    } else if (temperatureInCelsius >= 9 && temperatureInCelsius <= 15) {
        document.body.style.backgroundImage = "url('rain_background.jpg')";
    } else if (temperatureInCelsius > 15 && temperatureInCelsius <= 25) {
        document.body.style.backgroundImage = "url('cloudy.jpg')";
    } else if (temperatureInCelsius > 25) {
        document.body.style.backgroundImage = "url('sunny_background.jpg')";
    }
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundRepeat = 'no-repeat';
}