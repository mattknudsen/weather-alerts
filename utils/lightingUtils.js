var currentSWSIds = [];
var currentSVRWarningIds = [];
var currentTORWarningIds = [];
var currentPDSTORWarningIds = [];
var currentTOREmergencyIds = [];

function determineLightingPattern(weatherData) {
    console.log(weatherData);
    const SpecialWeatherStatements = weatherData.filter(warning => warning.properties.event === 'Special Weather Statement');
    const SVRWarnings = weatherData.filter(warning => warning.properties.event === 'Severe Thunderstorm Warning');
    const TORWarnings = weatherData.filter(warning => warning.properties.event === 'Tornado Warning');
    const PDSTORWarnings = weatherData.filter(warning => warning.properties.parameters.tornadoDamageThreat && warning.properties.parameters.tornadoDamageThreat[0] === 'CONSIDERABLE');
    const TOREmergency = weatherData.filter(warning => warning.properties.parameters.tornadoDamageThreat && warning.properties.parameters.tornadoDamageThreat[0] === 'CATASTROPHIC');

    console.log("Current SWS Ids: ", currentSWSIds);
    console.log("Current SVR Warning Ids: ", currentSVRWarningIds);
    console.log("Current TOR Warning Ids: ", currentTORWarningIds);
    console.log("Current PDS TOR Warning Ids: ", currentPDSTORWarningIds);
    console.log("Current TOR-E Ids: ", currentTOREmergencyIds);


    const newSWS = SpecialWeatherStatements.filter(warning => !currentSWSIds.includes(warning.id));
    const newSVRWarnings = SVRWarnings.filter(warning => !currentSVRWarningIds.includes(warning.id));
    const newTORWarnings = TORWarnings.filter(warning => !currentTORWarningIds.includes(warning.id));
    const newPDSTORWarnings = PDSTORWarnings.filter(warning => !currentPDSTORWarningIds.includes(warning.id));
    const newTOREmergencies = TOREmergency.filter(warning => !currentTOREmergencyIds.includes(warning.id));

    console.log("New SWS", newSWS);
    console.log("New SVR", newSVRWarnings);
    console.log("New TOR", newTORWarnings);
    console.log("New PDS TOR", newPDSTORWarnings);
    console.log("New TOR-E", newTOREmergencies);

    if (newSWS.length > 0) {
        currentSWSIds.push(...newSVRWarnings.map(warning => warning.id));
    }

    if (newSVRWarnings.length > 0) {
        currentSVRWarningIds.push(...newSVRWarnings.map(warning => warning.id));
    }

    if (newTORWarnings.length > 0) {
        currentTORWarningIds.push(...newTORWarnings.map(warning => warning.id));
    }

    if (newPDSTORWarnings.length > 0) {
        currentPDSTORWarningIds.push(...newPDSTORWarnings.map(warning => warning.id));
    }

    if (newTOREmergencies.length > 0) {
        currentTOREmergencyIds.push(...newTOREmergencies.map(warning => warning.id));
    }


    if (newTOREmergencies.length > 0) {
        return "TOR-E";
    }

    if (newPDSTORWarnings.length > 0) {
        return "PDSTOR";
    }

    if (newTORWarnings.length > 0) {
        return "TOR";
    }
    
    if (newSVRWarnings.length > 0) {
        return "SVR";
    }

    if (newSWS.length > 0) {
        return "SWS";
    }

    return "default";
}

module.exports = { determineLightingPattern };
