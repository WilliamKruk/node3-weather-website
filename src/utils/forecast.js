const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ad9991b32e5f60f80081d389c15ea92d&query=${lat},${long}&units=f`
    request({url: url, json: true}, (error, response) => {
        if (error) {
            console.log('Unable to connect to weather service.')
        } else if (response.body.error) {
            callback(`Could not find weather data for location: ${`${lat}, ${long}`}`, undefined)
        } else {
            callback(undefined, data = {    
                temp: `It is currently ${response.body.current.temperature} degrees out.`,
                precip: `There is a ${response.body.current.precip * 100}% chance of rain.`,
                desc: `It is currently ${response.body.current.weather_descriptions[0].toLowerCase()}.`
            })
        }
    })
}


module.exports = forecast