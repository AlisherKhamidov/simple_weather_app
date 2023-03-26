const temperatureElement = document.getElementById("temperature");
const placeElement = document.getElementById("place");
const windspeedElement = document.getElementById("windspeed");
const weathercodeElement = document.getElementById("weathercode");

// 
function getWeatherDescriptionByCode(code) {
  console.log(code);
  switch (code) {
    case 0: return "Clear sky";
    case 1, 2, 3: return "Mainly clear, partly cloudy, and overcast";
    case 45, 48: return "Fog and depositing rime fog";
    case 51, 53, 55: return "Drizzle: Light, moderate, and dense intensity";
    case 56, 57: return "Freezing Drizzle: Light and dense intensity";
    case 61, 63, 65: return "Rain: Slight, moderate and heavy intensity";
    case 66, 67: return "Freezing Rain: Light and heavy intensity";
    case 71, 73, 75: return "Snow fall: Slight, moderate, and heavy intensity";
    case 77: return "Snow grains";
    case 66, 67: return "Freezing Rain: Light and heavy intensity";
    case 80, 81, 82: return "Rain showers: Slight, moderate, and violent";
    case 85, 86: return "Thunderstorm: Slight or moderate";
    case 96, 99: return "Thunderstorm with slight and heavy hail";
    default: return "";
  }
}

async function main() {
  const coordinatesResponseObj = await fetch("https://get.geojs.io/v1/ip/geo.json")
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));

  const { latitude, longitude, city} = coordinatesResponseObj;
 
  const weatherResponseObj = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.error(err));
  const { current_weather } = await weatherResponseObj;
  const { temperature, windspeed, weathercode } = current_weather;
  console.log("t: " + temperature + " " + windspeed + " " + weathercode);
  placeElement.innerText += " " + city.toUpperCase();
  temperatureElement.innerText = windspeed + "°";
  const temperatureText = document.createTextNode(temperature);
  windspeedElement.insertBefore(temperatureText, windspeedElement.firstChild);
  weathercodeElement.innerText = getWeatherDescriptionByCode(weathercode);
}

main();


