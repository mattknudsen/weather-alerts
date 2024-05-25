var currentSVRWarningIds = [];
var currentTORWarningIds = [];

function determineLightingPattern(weatherData) {
    console.log(weatherData);
    const SVRWarnings = weatherData.filter(warning => warning.properties.event === 'Severe Thunderstorm Warning');
    const TORWarnings = weatherData.filter(warning => warning.properties.event === 'Tornado Warning');

    console.log("Current SVR Warning Ids: ", currentSVRWarningIds);
    console.log("Current TOR Warning Ids: ", currentTORWarningIds);

    const newSVRWarnings = SVRWarnings.filter(warning => !currentSVRWarningIds.includes(warning.id));
    const newTORWarnings = TORWarnings.filter(warning => !currentTORWarningIds.includes(warning.id));

    console.log("newSVR", newSVRWarnings);
    console.log("newTOR", newTORWarnings);

    if (newSVRWarnings.length > 0) {
        currentSVRWarningIds.push(...newSVRWarnings.map(warning => warning.id));
    }

    if (newTORWarnings.length > 0) {
        currentTORWarningIds.push(...newTORWarnings.map(warning => warning.id));
    }

    if (newTORWarnings.length > 0) {
        return "red";
    }
    
    if (newSVRWarnings.length > 0) {
        return "yellow";
    }

    return "default";
}

module.exports = { determineLightingPattern };
