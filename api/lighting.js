const axios = require('axios');

var currentValue = null;

async function updateLights(lightingPattern) {
  let value;
  if (lightingPattern === "TOR-E") {
    value = 10662071
  }
  else if (lightingPattern === "PDSTOR") {
    value = 10658039
  }
  else if (lightingPattern === "TOR") {
    value = 10657707;
  }
  else if (lightingPattern === "SVR") {
    value = 10657698;
  }
  else if (lightingPattern === "SWS") {
    value = 10713134;
  } else {
    value = 10657889; // Default to white
  }

  if (value !== currentValue) {
    try {
        const response = await axios.post('https://openapi.api.govee.com/router/api/v1/device/control', {
            requestId: '1',
            payload: {
            sku: 'H619C',
            device: 'B0:1B:7C:A6:B0:9D:28:D3',
            capability: {
                type: 'devices.capabilities.dynamic_scene',
                instance: 'diyScene',
                value: value
            }
            }
        }, {
            headers: {
            'Content-Type': 'application/json',
            'Govee-API-Key': '9f194d55-465c-4307-89f6-1d015103f2fd'
            }
        });
    
        console.log(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
  }
  else {
    console.log("No Value Change");
  }
  currentValue = value;
  console.log(currentValue);
}

module.exports = { updateLights };
