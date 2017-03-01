# koa-weather
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/theslyone/koa-weather.svg?branch=master)](https://travis-ci.org/theslyone/koa-weather)

Koajs geo­location and weather service middleware

## Usage
Follow the steps in [koajs](http://koajs.com) to setup a koa enabled nodejs server

Then simply `npm install koa-weather --save`

`import weatherMiddleware from 'koa-weather'`

`app.use(weatherMiddleware(options))`

options provides a means to trigger an exception to terminate the pipeline with a 500 code error if weather data API request fails

option parameter
* `throwOnError` default true

## Example Usage
[koa-weather-test](https://github.com/theslyone/kia-weather-test.git)

##Third party APIs
* [Geo location request API](http://ip­api.com)
* [Weather data request API](http://openweathermap.org/api)
