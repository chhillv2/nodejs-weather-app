const fs = require('fs')

const loadResultLogs = () => {
    try {
        const dataBuffer = fs.readFileSync('logsResults/result_logs.json');
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }
    catch (e) {
        return []
    }
}

const saveLogs = (logs) => {
    const dataJson = JSON.stringify(logs)
    fs.writeFileSync('logsResults/result_logs.json', dataJson)
}

const addLogs = (temperature, region, country, localtime) => {
    const logs = loadResultLogs();
    logs.push({
        temperature: temperature,
        region: region,
        country: country,
        localtime: localtime
    })
    saveLogs(logs)
}

const loadError = () => {
    try {
        const dataBuffer = fs.readFileSync('logsResults/error_logs.json');
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }
    catch (e) {
        return []
    }
}

const saveError = (logs) => {
    const dataJson = JSON.stringify(logs)
    fs.writeFileSync('logsResults/error_logs.json', dataJson)
}

const logError = (error) => {
    const logs = loadError();
    logs.push({
        error: error,
        DateTime: new Date()
    })
    saveError(logs)
}

module.exports = {
    addLogs,
    logError
}