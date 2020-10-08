const request = require('request')

const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJhc2hhYWQiLCJhIjoiY2tleW96Nmw1MGMxYjJ1b29uZXc1Y3AydCJ9.s2UQlw01MYPKkUCAv44GIw&limit=17`
    request({url, json:true},(error,{body}={})=>{ //destructuring the response object // this 'error' is from no internet connection for example or a wrong URL
        if(error){ //here might be no internet connection or an incorrect URL and this error would be thrown so it is being handled
            callback('Unable to connect to geocode service',undefined)
            // console.log(chalk.red.inverse('Unable to connect to geocode service'))
        }else if(body.features.length === 0){ // body.features is an array of objects and here the length is checked for 0. If 0, that means the location entered be incorrect so it returns no results
            callback('Unable to find location, please insert a valid location',undefined)
            // console.log(chalk.red.inverse('Unable to find location, please insert a valid location'))
        }else{
            callback(undefined,{
                Latitude: body.features[0].center[0],
                Longitude: body.features[0].center[1],
                Place: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode