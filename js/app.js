const addCityButton = document.querySelector("#add-city");
const addCityForm = document.querySelector(".module__form");

addCityButton.addEventListener("click", function() {
    const isHidden = addCityForm.hidden;
    isHidden ? addCityForm.hidden = false : addCityForm.hidden = true;
})