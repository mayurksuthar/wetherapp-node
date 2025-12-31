const request = require('postman-request');

const forcast = (latlong,long , callback) => {
	
const url = `https://api.weatherstack.com/current?access_key=ce769c23a10c5c407e32454a42154a09&query=${latlong},${long}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.current);
    }
  });
}

module.exports= forcast;