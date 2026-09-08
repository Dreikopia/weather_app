const weatherForm = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");

const card = document.querySelector("#card");
const errorDisplay = document.querySelector("#errorDisplay");

const cityDisplay = document.querySelector("#cityDisplay");
const tempDisplay = document.querySelector("#tempDisplay");
const weatherDisplay = document.querySelector("#weatherDisplay");
const humidityDisplay = document.querySelector("#humidityDisplay");
const conditionDisplay = document.querySelector("#conditionDisplay");

const apiKey = "4a899520093b0aa078c4dbee8663477f";


weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city.");
        return;
    }

    hideError();

    try {

        const weatherData = await getWeatherData(city);

        displayWeatherInfo(weatherData);

    } catch (error) {

        showError("Couldn't find that city.");

    }

});


// Fetch weather
async function getWeatherData(city) {

    const apiUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Couldn't find the city");
    }

    return await response.json();
}


// Convert Kelvin → Celsius
function toCelsius(kelvin) {

    return Math.round(kelvin - 273.15);

}


function displayWeatherInfo(data) {

    const {
        name: city,
        main: {
            temp,
            humidity
        },
        weather: [
            {
                description,
                id
            }
        ]
    } = data;


    cityDisplay.textContent = city;
    tempDisplay.textContent = `${toCelsius(temp)}°C`;
    weatherDisplay.textContent = `${getWeatherEmoji(id)} ${description}`;
    humidityDisplay.textContent = `${humidity}%`;
    conditionDisplay.textContent = description;


    card.classList.remove("hidden");
}


function showError(message) {

    card.classList.add("hidden");

    errorDisplay.textContent = message;

    errorDisplay.classList.remove("hidden");

}


function hideError() {

    errorDisplay.classList.add("hidden");

    errorDisplay.textContent = "";

}


function getWeatherEmoji(weatherId) {

    switch (true) {

        case weatherId >= 200 && weatherId < 300:
            return "⛈️";

        case weatherId >= 300 && weatherId < 400:
            return "🌧️";

        case weatherId >= 500 && weatherId < 600:
            return "🌧️";

        case weatherId >= 600 && weatherId < 700:
            return "❄️";

        case weatherId >= 700 && weatherId < 800:
            return "😶‍🌫️";

        case weatherId === 800:
            return "☀️";

        case weatherId >= 801 && weatherId < 810:
            return "☁️";

        default:
            return "❓";
    }
}
