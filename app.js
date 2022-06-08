const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const dets = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

    console.log(data);
    const cityDets = data.details;
    const weather = data.weather;
    console.log(data);
    //update details template
    dets.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3"${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    //update images and icons
    const icons = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', icons);

    let times = null;
    if(weather.IsDayTime){
        times = 'img/day.svg';
    } else {
        times = 'img/night.svg';
    }
    time.setAttribute('src', times);

    //remove d-none

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updatecity = async(city) => {
    const details = await getCity(city);
    const weather = await getweather(details.Key);

    return {details, weather};
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();
    updatecity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});