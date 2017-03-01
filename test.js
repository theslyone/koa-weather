/*!
 * koa-weather <https://github.com/theslyone/koa-weather>
 *
 * Copyright (c) 2017 Okonkwo Sylvester, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

import chai, { expect } from 'chai'
import Koa from 'koa'
import request from 'supertest'
import weatherMiddleware from './index'

let app = new Koa()
app.use(weatherMiddleware());
app.use(ctx =>
  {
    expect(ctx.request.geoLocation).to.be.an('object');
    expect(ctx.request.geoLocation).to.have.property('lat');
    expect(ctx.request.geoLocation).to.have.property('lon');

    expect(ctx.request.weatherData).to.be.an('object');
    expect(ctx.request.weatherData).to.have.property('temp');
    expect(ctx.request.weatherData).to.have.property('weatherCode');
    ctx.body = 'Hello World';
  })
let server = app.listen();
let agent = request.agent(server)

describe('koa-weather', function () {
  it('should return geo-location, weather data and call next middleware', function (done) {
    agent.get('/')
      .expect(200, 'Hello World')
      .end((err) => {
        expect(err).to.not.be.an('error');
        done()
      })
  })
})
