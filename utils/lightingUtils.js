var currentSVRWarningIds = [];
var currentTORWarningIds = [];
var currentPDSTORWarningIds = [];
var currentTOREmergencyIds = [];

function determineLightingPattern(weatherData) {
    console.log(weatherData);
    const SVRWarnings = weatherData.filter(warning => warning.properties.event === 'Severe Thunderstorm Warning' && warning.properties.messageType !== 'Update');
    const TORWarnings = weatherData.filter(warning => warning.properties.event === 'Tornado Warning' && warning.properties.messageType !== 'Update');
    const PDSTORWarnings = weatherData.filter(warning => warning.properties.parameters.tornadoDamageThreat === 'CONSIDERABLE');
    const TOREmergency = weatherData.filter(warning => warning.properties.parameters.tornadoDamageThreat === 'CATASTROPHIC');

    console.log("Current SVR Warning Ids: ", currentSVRWarningIds);
    console.log("Current TOR Warning Ids: ", currentTORWarningIds);
    console.log("Current PDS TOR Warning Ids: ", currentPDSTORWarningIds);
    console.log("Current TOR-E Ids: ", currentTOREmergencyIds);


    const newSVRWarnings = SVRWarnings.filter(warning => !currentSVRWarningIds.includes(warning.id));
    const newTORWarnings = TORWarnings.filter(warning => !currentTORWarningIds.includes(warning.id));
    const newPDSTORWarnings = PDSTORWarnings.filter(warning => !currentPDSTORWarningIds.includes(warning.id));
    const newTOREmergencies = TOREmergency.filter(warning => !currentTOREmergencyIds.includes(warning.id));

    console.log("New SVR", newSVRWarnings);
    console.log("New TOR", newTORWarnings);
    console.log("New PDS TOR", newPDSTORWarnings);
    console.log("New TOR-E", newTOREmergencies);

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

    return "default";
}

module.exports = { determineLightingPattern };
