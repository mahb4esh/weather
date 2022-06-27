const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'http://api.positionstack.com/v1/forward?access_key=2a3158797e54498e4f8cc2f6b0bbd455&query=' + encodeURI(address)

    request({url:url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!!!', undefined)
        } else if(body.error) {
            callback('Unable to get location!!!. Try another location', undefined)
        } else if(body.data.length === 0) {
            callback('Unable to find location. Try another location', undefined)
        } else {
            callback(undefined, {
                latitude : body.data[0].latitude,
                longitude: body.data[0].longitude,
                Place: body.data[0].name
            }
        )}
    })
}

module.exports = geocode
