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


async function createNewWeatherDiv(cityName) {
    const weatherTemplateCloned = weatherDivTemplate.cloneNode(true);
    let weatherFromAPI = await weatherAPI.getWeather(cityName);

    setWeatherInfoForToday(weatherFromAPI,weatherTemplateCloned);
    setUpcomingDaysForecast(weatherFromAPI,weatherTemplateCloned);
    addRemoveButtonEvent(weatherTemplateCloned);

    weatherTemplateCloned.hidden = false;
    document.querySelector("#app").appendChild(weatherTemplateCloned);
}

function setWeatherInfoForToday(weatherFromAPI, divElement) {
    divElement.querySelector(".city__name").innerHTML = weatherFromAPI.location.name;
    divElement.querySelector(".weather__icon").innerHTML =
        `<img style="width: 110px" src="${weatherFromAPI.current.condition.icon}"/>`;
    divElement.querySelector(".temperature__value").innerHTML = weatherFromAPI.current.temp_c;
    divElement.querySelector(".pressure__value").innerHTML = `${weatherFromAPI.current.pressure_mb} hPa`;
    divElement.querySelector(".humidity__value").innerHTML = `${weatherFromAPI.current.humidity} %`;
    divElement.querySelector(".wind-speed__value")
        .innerHTML = `${Math.round(weatherFromAPI.current.wind_kph * 100 / 36) / 10} m/s`;
}

function setUpcomingDaysForecast(weatherJson, divElement) {
    const forecastList = divElement.querySelector(".weather__forecast");
    forecastList.innerHTML = "";

    weatherJson.forecast.forecastday.forEach(el => {
        let liElement = document.createElement("li");

        liElement.innerHTML = `
          <span class="day">${new Date(el.date).toLocaleDateString("pl-PL", {weekday: 'long'})}</span> 
          <img style="padding: 10px;" src="${el.day.condition.icon}"/>
          <span class="temperature"><span class="temperature__value">${el.day.maxtemp_c}</span>&deg;C</span>`;

        forecastList.appendChild(liElement);
    });
}

function addRemoveButtonEvent(divElement) {
    divElement.querySelector(".btn--close").addEventListener("click", function () {
        this.parentElement.remove();
    })
}

const findCityForm = document.querySelector(".find-city");
findCityForm.querySelector("button").addEventListener("click", ev => {
    const cityName = findCityForm.querySelector("#search").value;
    ev.preventDefault();
    addCityForm.hidden = true;
    console.log(cityName);
    createNewWeatherDiv(cityName);
})
createNewWeatherDiv("auto:ip");

