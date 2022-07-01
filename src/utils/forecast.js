const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=089d7ba06d946cc5abcdfca580f927e0&query=' + encodeURIComponent(latitude) +',' + encodeURIComponent(longitude)
    
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service!', undefined)
        } else if (body.error) {
            callback('Unable to get forecast to specified place', undefined)
        } else if (body.data === 0) {
            callback('Invalid place to get weather', undefined)
        } else {
            weather = body.current.weather_descriptions[0] 
            cur_temp = body.current.temperature 
            feel_temp = body.current.feelslike
            is_day = body.current.is_day
            precip = body.current.precip
            console.log(is_day)
            console.log(precip)
            callback(undefined, {
                'Weather' : weather,
                'cur_temp' : cur_temp,
                'feel_temp' : feel_temp,
                'precip' : precip,
                'is_day' : is_day
            })
        }
    }
)}

module.exports = forecast
