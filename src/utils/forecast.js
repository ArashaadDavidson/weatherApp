const request = require('request')

const forecast = (lon, lat, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=ca992b39f0c7287a21292f77888f88c6&query=${lat},${lon}&units=m`

    request({url, json: true}, (error, {body}={})=>{ //destructuring the response object
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast