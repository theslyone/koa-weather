/*!
 * koa-weather <https://github.com/theslyone/koa-weather>
 *
 * Copyright (c) 2017 Okonkwo Sylvester, contributors.
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

import mocha from 'mocha'
import chai, { expect } from 'chai'
import Koa from 'koa'
import request from 'supertest'
var weatherMiddleware from './index'

var app = new Koa()

test('koa-weather', function () {
  test('should return weather data', function (done) {
    app.use(weatherMiddleware())

    request(app.callback())
      .get('/')
      .expect(200, 'Hello World')
      .end(done)
  })
  test('should yield next middleware', function (done) {
    var ok = false

    app
      .use(function * (next) {
        this.helloworld = true
        yield * next
      })
      .use(weatherMiddleware())
      .use(function * (next) {
        expect(this.helloworld).to.be.true
        ok = true
      })

    request(app.callback())
      .get('/')
      .expect(200, 'Hello World')
      .end(function (err) {
        test.ifError(err)
        test.equal(ok, true)
        done()
      })
  })
})
