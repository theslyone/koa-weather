# koa-weather
==============
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.org/theslyone/koa-weather.svg?branch=master)](https://travis-ci.org/theslyone/koa-weather)

Koajs geo­location and weather service middleware

## Usage
Simply `npm install koa-weather --save`

`import weatherMiddleware from 'koa-weather'`

`app.use(weatherMiddleware(options))`

options providers a means to trigger an exception to terminate the pipeline with a 500 code error if weather data API request fails

option parameter
* `throwOnError` default true

##Third party APIs
* [Geo location request API](http://ip­api.com)
* [Weather data request API](http://openweathermap.org/api))
