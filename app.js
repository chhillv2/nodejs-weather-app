const geocode = require('./utils/geocode')
const forecastWeather = require('./utils/forecast')
const logs = require('./logs/saveLogs')
const sendErrorEmailToAdmin = require('./emails/sendEmailErrors')
const chalk = require('chalk');

const addresses = process.argv.slice(2)
console.log("Address", addresses)

if (addresses.length === 0) {
    console.log("please provide the address")
}
else {
    addresses.forEach((address) => {
        geocode(address, (error, data = {}) => {
            if (error) {
                logs.logError(error + address)
                sendErrorEmailToAdmin.then(
                    () => console.log("Email for this error has been sent to the admin => vikaschhillar786@gmail.com"))
                    .catch((error) => {
                    console.log('Something went wrong', error.message);
                });
                return console.log(chalk.red(error + address))
            }
            forecastWeather(data.lat, data.long, (error, forecastdata) => {
                if (error) { return console.log(error) }
                console.log(chalk.green("The temperature of ", forecastdata.region, forecastdata.country + ' is ' + forecastdata.temperature + '. The local date and time is ' + forecastdata.localtime))
                logs.addLogs(forecastdata.temperature, forecastdata.region, forecastdata.country, forecastdata.localtime)
            })

        })
    })
}



