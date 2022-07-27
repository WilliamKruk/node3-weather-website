const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=663a9f1a57281322970140b4f50e9a28&query=${encodeURIComponent(address)}`

    request({url: url, json: true}, (error, {body}) => {
        //console.log(JSON.stringify(response, null, 2))
        if(error) {
            callback('Unable to connect to location services!', undefined) 
        } else if (!body.data[0]) {
            callback('Unable to find location. Try another search', undefined)
        } else if (!body.data[0].latitude) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                disp: `Coords: ${body.data[0].latitude}, ${body.data[0].longitude}.`,
                region: `Region: ${body.data[0].region}`,
                street: `Street: ${body.data[0].street}`,
                data: `${body.data[0].latitude}, ${body.data[0].longitude}.`
            })
        }
    })
}

module.exports = geocode