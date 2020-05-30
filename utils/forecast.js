const request = require('request')

const forecastWeather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=19e76702d8f17eacc2a7ad5aa8193619&query=' + lat + ',' + long;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) { callback('unable to connect', undefined) }
        else if (body.error) {
            callback('try different location', undefined)
        }
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                region: body.location.name,
                country: body.location.country,
                localtime: body.location.localtime
            })
        }
    })
}

module.exports = forecastWeather


