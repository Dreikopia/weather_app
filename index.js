const weatherForm = document.querySelector("#weatherForm");
const cityInput = document.querySelector("#cityInput");
const card = document.querySelector("#card");

const apiKey = "4a899520093b0aa078c4dbee8663477f";


weatherForm.addEventListener('submit', async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        } catch (error) {
            displayError("Please Enter a city");
        }
    } else {

    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Couldn't find the city");
    }

    return await response.json();
}

const toCelsius = kelvin => Math.round(kelvin - 273.15);

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";
    card.textContent = "";
    card.style.display = "flex";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body items-center text-center";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    const celsiusTemp = toCelsius(temp).toFixed(1);

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${celsiusTemp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.className = 'text-black font-bold text-4xl items-center';
    tempDisplay.className = 'text-info';
    humidityDisplay.className = 'text-red-500';
    descDisplay.className = 'text-green-500';
    weatherEmoji.className = 'text-green-500';

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}



function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";

        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "😶‍🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "?";
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    errorDisplay.classList.add(
        "text-red-500",
        "font-bold",
        "text-center",
        "mt-4"
    );

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

