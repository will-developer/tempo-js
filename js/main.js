const temperatureField = document.querySelector('.temp p');
const locationField = document.querySelector('.time-location .location');
const dateTimeField = document.querySelector('.time-location .date-time');
const weatherField = document.querySelector('.condition p');
const searchField = document.querySelector('.search-area');
const form = document.querySelector('form');

let target = 'São Paulo';

const fetchWeather = async (selectLocation) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=449a13b06bf442e3909144904243007&q=${selectLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    const locationName = data.location.name;
    const time = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
  } catch (error) {
    console.error('Erro ao buscar dados do tempo:', error);
  }
};

function updateDetails(temp, locationName, time, condition) {
  const [date, currentTime] = time.split(' ');
  const currentDay = getDayName(new Date(date).getDay());

  temperatureField.innerText = `${temp} °C`;
  locationField.innerText = locationName;
  dateTimeField.innerText = `${currentTime} - ${currentDay} ${date}`;
  weatherField.innerText = condition;
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value;
  fetchWeather(target);
}

form.addEventListener('submit', searchForLocation);

function getDayName(number) {
  switch (number) {
    case 0:
      return 'Domingo';
    case 1:
      return 'Segunda-Feira';
    case 2:
      return 'Terça-Feira';
    case 3:
      return 'Quarta-Feira';
    case 4:
      return 'Quinta-Feira';
    case 5:
      return 'Sexta-Feira';
    case 6:
      return 'Sábado';
    default:
      return '';
  }
}
