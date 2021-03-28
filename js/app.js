import Diacritics from 'diacritic';

const addCityButton = document.querySelector("#add-city");
const addCityForm = document.querySelector(".module__form");


addCityButton.addEventListener("click", function () {
    const isHidden = addCityForm.hidden;
    isHidden ? addCityForm.hidden = false : addCityForm.hidden = true;
})

const closeCityFormButton = addCityForm.querySelector(".btn--close");

closeCityFormButton.addEventListener("click", function () {
    addCityForm.hidden = true;
})

class API {
    url = "http://api.weatherapi.com/v1/forecast.json?key=";
    weatherAPI_KEY = "b4538d46e950401ba89120559212803";

    async getWeather(city) {
        try {
            city = Diacritics.clean(city);
            const response = await fetch(`${this.url}${this.weatherAPI_KEY}&q=${city}&days=5`);
            return await response.json();
        } catch (e) {
            console.log("error: " + e);
        }
    }
}

const weatherAPI = new API();

const weatherDivTemplate = document.querySelector(".module__weather");

const weatherTemplateCloned = weatherDivTemplate.cloneNode(true);

async function createNewWeatherDiv(cityName) {
    let weatherFromAPI = await weatherAPI.getWeather(cityName);

    weatherTemplateCloned.querySelector(".city__name").innerHTML = weatherFromAPI.location.name;
    weatherTemplateCloned.querySelector(".temperature__value").innerHTML = weatherFromAPI.current.temp_c;
    weatherTemplateCloned.querySelector(".pressure__value").innerHTML = `${weatherFromAPI.current.pressure_mb} hPa`;
    weatherTemplateCloned.querySelector(".humidity__value").innerHTML = `${weatherFromAPI.current.humidity} %`;
    weatherTemplateCloned.querySelector(".wind-speed__value")
        .innerHTML = `${Math.round(weatherFromAPI.current.wind_kph * 100 / 36) / 10} m/s`;

    weatherTemplateCloned.hidden = false;
    document.querySelector("#app").appendChild(weatherTemplateCloned);
}
createNewWeatherDiv("auto:ip");
