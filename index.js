/*!
 * koa-weather <https://github.com/tunnckoCore/koa-weather>
 *
 * Copyright (c) 2017 Okonkwo Sylvester, contributors.
 * Released under the MIT license.
 */

'use strict'

import rp from 'request-promise'

const weatherMiddle = (options) {
  let options = options || ':method ":url"';

  return async function weather (ctx, next) {
    let ipAddress = ${ctx.request.ip};

    ctx.log.info(`request from ${ctx.request.ip} to ${ctx.path}`);
    rp(`http://ip-api.com/json/${ctx.request.ip}`)
    .then((resp) => {
      this.lat = resp.lat;
      this.lon = resp.lon;
      this.country = resp.country;
      this.countryCode = resp.countryCode;
      this.city = resp.city;
      return resp;
    })
    .then((resp) => {
      rp(`api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&APPID=922b22f92a07fc03c7a6c35d1cc6c760`)
      .then(function (resp) {
        this.temp = resp.main['temp'];
        this.humidity = resp.main['humidity'];
        this.pressure = resp.main['pressure'];
        this.tempMin = resp.main['temp_min'];
        this.tempMax = resp.main['temp_max'];
        this.windSpeed = resp.wind['speed'];
        this.windDeg = resp.wind['deg'];
        this.weatherCode = resp.id;
      })
    })
    .catch(function (err) {
      next(err)
    });
    await next();
  };

  /*return function* weather (next) {
    yield* next;
  };*/
}

export default (options) => weatherMiddle
