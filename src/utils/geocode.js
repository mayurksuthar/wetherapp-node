const request = require('postman-request');

const geocode = (address , callback) => {
	const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1IjoidXNlcm5hbWUwMDcwIiwiYSI6ImNtaWU4MWhrbjA2ZXMybHM1ajNpbzZhc3MifQ.-N3yQDQvg1blnP4JP7HROQ&limit=1';

	request ({ url, json: true}, (er,{body}) => {
		if(er){
			callback('unable to connect', undefined);
		}else if (body.features.length === 0){
			callback('not get data try agian', undefined);
		}
		else{
			callback(undefined, {
				lat: body.features[0].geometry.coordinates[1],
				long: body.features[0].geometry.coordinates[0],
				fullname:body.features[0].properties.full_address
			});
		}
	})
}

module.exports= geocode;