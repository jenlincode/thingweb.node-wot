WoT.produce({
	title: "sensors",
	titles: {
		"en": "Sensors",
		"de": "Sensors",
		"it": "Capteurs"
	},
	description: "Sensor Example Thing",
	descriptions: {
		"en": "Sensor Example Thing",
		"de": "Sensor Beispielsache",
		"it": "Esempio de sensore"
	},
	support: "git://github.com/eclipse/thingweb.node-wot.git",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"iot": "http://example.org/iot"}],
	properties: {
		gpsSensor: {
            type: "object",
            "properties": {
                "sensor_id": {
                    "@type": "@id",
                    "type": "string"
                },
                "nmea_type": {
                    "type": "string"
                },
                "timestamp": {
                    "type": "string"
                },
                "gps_position": {
                    "type": "object",
                    "lat": {
                        "@id": "saref:hasValue",
                        "type": "number"
                    },
                    "lon": {
                        "@id": "saref:hasValue",
                        "type": "number"
                    },
                    "alt": {
                        "@id": "saref:hasValue",
                        "type": "number"
                    }
                }
            },
			description: "Latitude, longitude, altitude of gps sensor",
			descriptions: {
				"en": "Latitude, longitude, altitude of gps sensor",
				"de": "Derzeitiger x Stand",
				"it": "valore attuale del x"
			},
			"iot:Custom": "example annotation",
			observable: true,
			readOnly: false
		},
		lastChange: {
			type: "string",
			description: "last change of value",
			descriptions: {
				"en":"last change of value",
				"de": "Letzte Änderung",
				"it": "ultima modifica del valore"
			},
			observable: true,
			readOnly: true
		}
	},
	actions: {
		setGPSPos: {
			description: "Setting the position value",
			descriptions: {
				"en": "Setting the position value",
				"de": "Zähler erhöhen",
				"it": "incrementare valore"
			},
			uriVariables: {
				sensor_id: { "type": "string"},
				nmea_type: { "type": "string"},
				timestamp: { "type:": "string"},
				lat: { "type": "number"},
				lon: { "type": "number"},
				alt: { "type": "number"}
			}
		},
	},
	events: {
		change: {
			description: "change event",
			descriptions: {
				"en": "change event",
				"de": "Änderungsnachricht",
				"it": "resettare valore"
			}
		}
	}
})
.then((thing) => {
	console.log("Produced " + thing.title);
	
	// init property values
    thing.writeProperty("gpsSensor", '{ "sensor_id" : "", "nmea_type : "", "timestamp" : "", "gps_position" : { "lat" : 0, "lon" : 0, "alt" : 0 }}') 
	thing.writeProperty("lastChange", (new Date()).toISOString()); 
	
    // set action handlers
	thing.setActionHandler("setGPSPos", (params, options) => {
		return thing.readProperty("gpsSensor").then( (gpsSensor) => {
			let sensor_id;
			let nmea_type;
			let timestamp;
			let lat = 0;
			let lon = 0;
			let alt = 0;

			if (options && typeof options === 'object') {
				console.log("\n" +  options + "")
				if ('uriVariables' in options) {
					if ('sensor_id' in options['uriVariables']) {
						sensor_id = options['uriVariables']['sensor_id'];
					}
					if ('nmea_type' in options['uriVariables']) {
						nmea_type = options['uriVariables']['nmea_type'];
					}
					if ('timestamp' in options['uriVariables']) {
						timestamp = options['uriVariables']['timestamp'];
					}
					if ('lat' in options['uriVariables']) {
						lat = options['uriVariables']['lat'];
					}
					if ('lon' in options['uriVariables']) {
						lon = options['uriVariables']['lon']
					}
				    if('alt' in options['uriVariables']) {
						alt = options['uriVariables']['alt']
					}
				}
			}

            console.log("Setting gpsSensor values: " + sensor_id + " " + nmea_type + " " + timestamp + " " + lat + " " + lon);
			let gpsValue = '{ "sensor_id" : "' + sensor_id + '",' +
							  '"nmea_type" : "' + nmea_type + '",' +
							  '"timestamp" : "' + timestamp + '",' +
							  '"gps_position" : {' +
							  '"lat" : ' + lat + ','+
							  '"lon" : ' + lon + ',' +
							  '"alt" : ' + alt + '}}';
			thing.writeProperty("gpsSensor", gpsValue);

			thing.writeProperty("lastChange", (new Date()).toISOString());
			thing.emitEvent("change", gpsSensor);
		});
	});
	
	// expose the thing
	thing.expose().then( () => { console.info(thing.title + " ready"); } );
})
.catch((e) => {
	console.log(e)
});
