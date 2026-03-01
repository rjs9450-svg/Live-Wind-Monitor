let windSpeed
let windDegree
let perceivedTemp

function getWeather() {
  const apiKey = '9PKTYBKLV6MM6L3RVEKN8G9S2'; 
    const city = document.getElementById('locationField').value;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}&contentType=json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
  
        if (data.currentConditions) {
          windSpeed = data.currentConditions.windspeed;
          windDegree = data.currentConditions.winddir;
          perceivedTemp = data.currentConditions.feelslike;
        } else {
         console.log('No current conditions data available, using daily data instead.');
          windSpeed = data.days[0].windspeed;
          windDegree = data.days[0].winddir;
          perceivedTemp = data.days[0].feelslike;
        }
        console.log('current', windSpeed, windDegree, perceivedTemp);
        updateCircles();
        applyTempGradient(perceivedTemp);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
    }

function applyTempGradient(temp) {
  // im not sure why copilot decided to design the gradient like this but it works well.
  const minT = -20, maxT = 120;
  let t = (temp - minT) / (maxT - minT);
  t = Math.min(1, Math.max(0, t));
  const hue = 240 - 240 * t; 
  document.body.style.background = `linear-gradient(hsl(${hue}, 100%, 80%), hsl(${hue}, 100%, 60%))`;
}
