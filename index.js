const { getWeatherData } = require('./api/weather');
const { updateLights } = require('./api/lighting');
const { determineLightingPattern } = require('./utils/lightingUtils');

async function run() {
    try {
      const weatherData = await getWeatherData();
      //console.log("weather data", weatherData);
  
      const lightingPattern = determineLightingPattern(weatherData);

      console.log(lightingPattern);
  
      await updateLights(lightingPattern);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

run();

setInterval(run, 15000);