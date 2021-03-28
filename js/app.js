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
            const Diacritics = require('diacritic');
            city = Diacritics.clean(city);
            const response = await fetch(`${this.url}${this.weatherAPI_KEY}&q=${city}&days=5`);
            const weather = await response.json();
            console.log(weather);
        } catch (e) {
            console.log("error: " + e);
        }
    }
}
new API().getWeather("Białystok");
