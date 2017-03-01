/*!
 * koa-weather <https://github.com/tunnckoCore/koa-weather>
 *
 * Copyright (c) 2017 Okonkwo Sylvester, contributors.
 * Released under the MIT license.
 */

var rp = require('request-promise');

const parseResponse = (resp) => {
  let json = JSON.parse(resp)
  //if (json.status !== 'success') {
  //  throw new Error('Request error')
  //}
  return json
}

const weatherMiddleware = (options) => {
  options = Object.assign({}, { throwOnError: true }, options || {});

  return async (ctx, next) => {
    let ipAddress = ctx.request.ip;

    //await rp(`http://ip-api.com/json/${ipAddress}`) //ipAddress resolves to 127.0.0.1, not pasing ip auto resolves to ext ip in API
    await rp(`http://ip-api.com/json/`)
    .then(parseResponse)
    .then((json) => {
      ctx.request.geoLocation = {...json};
      return ctx.request.geoLocation
    })
    .then(async (geoLocation) => {
      let {lat, lon} = geoLocation
      let appId = '922b22f92a07fc03c7a6c35d1cc6c760'
      await rp(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${appId}`)
      .then(parseResponse)
      .then((json) => {
        ctx.request.weatherData = Object.assign({},
          { temp: json.main['temp'], humidity: json.main['humidity'],
            tempMin: json.main['temp_min'], tempMax: json.main['temp-max']},
          { windSpeed: json.wind['speed'], windDeg: json.wind['deg'] },
          { weatherCode: json.id });
      })
    })
    .catch((err) => {
      if (err && options.throwOnError) ctx.throw(err)
    });
    await next();
  }
}

export default weatherMiddleware
