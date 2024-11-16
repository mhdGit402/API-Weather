const submitWeather = document.querySelector("#search-weather");

submitWeather.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityWeather = document.querySelector("#city-weather").value;
  const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityWeather}?unitGroup=metric&key=MDFTDWGUVTVHDHYAS6MMW2ZSW&contentType=json`;
  searchWeather(query);
});

async function searchWeather(query) {
  try {
    const api = await fetch(query);
    if (!api.ok) {
      throw new Error(`Response status: ${api.status}`);
    }
    const response = await api.json();
    ui(response);
  } catch (error) {
    console.error(error.message);
  }
}

function ui(data) {
  const weather = {
    resolvedAddress: data.resolvedAddress,
    timeZone: data.timezone,
    description: data.description,
    temp: data.currentConditions.temp,
    icon: data.icon,
  };

  const showWeather = document.querySelector(".show-weather");

  Array.from(showWeather.children).forEach((e) => {
    if (e.id in weather) {
      e.textContent = weather[e.id];
    }
  });
}
