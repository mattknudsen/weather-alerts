const axios = require('axios');

const getWeatherData = async () => {
  try {
    const response = await axios.get('https://api.weather.gov/alerts/active/area/MN', {
      headers: {
        'User-Agent': 'mattknudsen10@yahoo.com',
        'Accept': 'application/geo+json'
      }
    });

    const data = response.data;
    console.log(data);
    const warnings = data.features.filter(feature => {
      return feature.properties.event === 'Severe Thunderstorm Warning' || feature.properties.event === 'Tornado Warning' || feature.properties.event === 'Special Weather Statement';
    });

    return warnings;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = { getWeatherData };
