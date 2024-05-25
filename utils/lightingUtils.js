const { getWeatherData } = require('./api/weather');
const { updateLights } = require('./api/lighting');
const { determineLightingPattern } = require('./utils/lightingUtils');

async function run() {
    const weatherData = await getWeatherData();

    const lightingPattern = determineLightingPattern(weatherData);

    await updateLights(lightingPattern);
}