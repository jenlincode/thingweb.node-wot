const axios = require('axios').default; // axios.<method> will now provide autocomplete and parameter typings
const url = "";

WoT.produce({
	title: "airobotics",
	titles: {
		"en": "Airobotics"
	},
	description: "WoT TD for Airobotics controls",
	descriptions: {
		"en": "WoT TD for Airobotics controls",
	},
	support: "git://github.com/eclipse/thingweb.node-wot.git",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"iot": "http://example.org/iot"}],
	properties: {
		missions: {
            type: "object",
            description: "list of mission ids",
            descriptions: {
                "en":"list of mission ids",
            },
            observable: true,
            readOnly: true
        },
        state: {
            currentMission: {

            },

        },
        cmdDone: {
            type: "object",
            description: "Command executed",
            descriptions: {
                "en":"executed",
            },
            observable: true,
            readOnly: true
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
		getMissions: {
			description: "Getting the list of missions",
			descriptions: {
				"en": "Getting the list of missions",
			},
			uriVariables: {
                detailed: { "type": "boolean"},
                id: {"type": "number"}
			}
        },
        cmd: {
            description: "Getting the commands for a mission",
			descriptions: {
				"en": "Getting the list of missions",
            },
            uriVariables: {
				missionId: { "type": "string"},
                command: { "type": "string"}
			}
        }
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
    thing.writeProperty("missions", {test: "testing value"});
    thing.writeProperty("cmdDone", { mission_id : 0, command : ""});
	thing.writeProperty("lastChange", (new Date()).toISOString());

    // set action handlers
    thing.setActionHandler("getMissions", (params, options) => {
        return thing.readProperty("missions").then( (missions) => {
            console.log('original mission: ' + JSON.stringify(missions))
            let isDetailed = false;
            let path = "/missions";

            let res = {id: '1234', name: 'Testing'};
        
            res2 =  { 
                "mission_info_type":"MISSION_DETAILS",
                "id":1,
                "name":"In-cage inspection",
                "description":"Hovers in cage for 2400 sec",
                "created_at":1462705200000,
                "updated_at":null,
                "payload_type":"GAS_SENSOR",
                "landing_docking_station_id":201,
                "takeoff_docking_station_id":201,
                "mission_flight_commands":[ 
                    { 
                        "mission_command_type":"TAKEOFF",
                        "ordinal":0,
                        "distance_from_previous":0.0,
                        "estimated_execution_time":16.000000000,
                        "first_height":2,
                        "wait_above_home":15,
                        "mission_command_type":"TAKEOFF"
                    },
                    { 
                        "mission_command_type":"PRE_MISSION",
                        "ordinal":1,
                        "distance_from_previous":3.749643829463649,
                        "estimated_execution_time":12.749000000,
                        "coordinates":{ 
                            "coordinate_type":"LATLON",
                            "latitude":32.10936111,
                            "longitude":34.89818814,
                            "height":23.7744,
                            "coordinate_type":"LATLON"
                        },
                        "time_to_wait":5,
                        "mission_command_type":"PRE_MISSION"
                    },
                    { 
                        "mission_command_type":"HOVER_AT",
                        "ordinal":2,
                        "distance_from_previous":0.0,
                        "estimated_execution_time":2400.000000000,
                        "type":"HOVER_AT_POINT",
                        "coordinates":{ 
                            "coordinate_type":"LATLON",
                            "latitude":32.10936111,
                            "longitude":34.89818814,
                            "height":null,
                            "coordinate_type":"LATLON"
                        },
                        "hover_time":2400,
                        "look_at":null,
                        "mission_command_type":"HOVER_AT"
                    },
                    { 
                        "mission_command_type":"POST_MISSION",
                        "ordinal":3,
                        "distance_from_previous":0.0,
                        "estimated_execution_time":10.000000000,
                        "coordinates":{ 
                            "coordinate_type":"LATLON",
                            "latitude":32.10936111,
                            "longitude":34.89818814,
                            "height":null,
                            "coordinate_type":"LATLON"
                        },
                        "time_to_wait":10,
                        "desired_height":2,
                        "mission_command_type":"POST_MISSION"
                    },
                    { 
                        "mission_command_type":"LANDING",
                        "ordinal":4,
                        "distance_from_previous":3.749643829463649,
                        "estimated_execution_time":9.367000000,
                        "type":"LAND_AT_HOME",
                        "coordinates":{ 
                            "coordinate_type":"LATLON",
                            "latitude":32.10932742,
                            "longitude":34.89818883,
                            "height":null,
                            "coordinate_type":"LATLON"
                        },
                        "landing_height":1.5,
                        "wait_dsptime_out":180,
                        "mission_command_type":"LANDING"
                    }
                ],
                "available":false,
                "unavailability_reason":"PAYLOAD_NOT_AVAILABLE",
                "unavailability_details":"Docking station 201 does not have a payload of type GAS_SENSOR available",
                "site_id":14,
                "landing_point_type":"FIXED_DOCKING_STATION",
                "max_humidity":94,
                "minimum_battery_voltage":26.7,
                "target_speed":0.5,
                "measured_time":null,
                "average_time":1123.280000000,
                "estimated_time":null,
                "reversible":false,
                "fly_to_point":false,
                "minimum_open_sky_height":2,
                "estimated_flight_distance":7.499287658927298,
                "mission_info_type":"MISSION_DETAILS"
            };

            if (options && typeof options === 'object' && 'uriVariables' in options) {
                
                if ('detailed' in options['uriVariables']) {
                    isDetailed = options['uriVariables']['detailed'];
                }
                else if ('id' in  options['uriVariables']) {
                    if (options['uriVariables']['id'] == 1) {
                        res = res2;
                    }
                }
            }

            if (isDetailed) {
                //path = "/detailed_missions"
                res = {id: 'DETAILED_MISSIONS', name: 'Testing'};
            }

            let uri = url + path;

            console.log("!!!! getMissions: detailed: " + isDetailed + " uri: " + uri);

            // Uncomment once Airobotics shares their IP
            /*axios.get(uri, body)
            .then(function (response) {
                console.log(response.data);
                thing.writeProperty("missions", response.data);
                thing.writeProperty("lastChange", (new Date()).toISOString());
                thing.emitEvent("change", response);
            })
            .catch(function (error) {
                console.log(error);
            });
            */
            res = res2;

            //console.log(response.data);
            console.log('Result: ' + res)
            thing.writeProperty("missions", res);
            thing.writeProperty("lastChange", (new Date()).toISOString());
            thing.emitEvent("change", res);
        });
    });
	thing.setActionHandler("cmd", (inputData) => {
		return thing.readProperty("cmdDone").then( (cmdDone) => {
            let commandDone = { "mission_id": 0, "command_done" : ""};
            if (inputData != null) {
                let command;
                let missionId;

                if (inputData["missionId"]) {
                    missionId = inputData["missionId"];
                }
                if (inputData["command"]) {
                    command = inputData["command"];

                    if (command == "return"){
                        command = "return_home"
                    }
                }

                if (missionId != null && command != null) {
                    let path = "/missions/" + missionId + "/" + command;

                    console.log("########### " + command)

                    let uri = url + path;
                    console.log("!!!!!!!!!! "+ uri);

                    commandDone = {"mission_id" : missionId, "command_done" : command};
                    
                   /* axios.put(uri)
                   .then(function (response) {
                        //console.log(response);
                        // Write new cmdDone property
                        let commandDone = { mission_id : missionId, start_command : command, res : response.data};

                        console.log(commandDone);
                        thing.writeProperty("cmdDone", commandDone);
                        thing.writeProperty("lastChange", (new Date()).toISOString());
                        thing.emitEvent("change", commandDone);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });*/
                }
            }
            console.log('Result: ' + commandDone)
            thing.writeProperty("cmdDone", commandDone);
            thing.writeProperty("lastChange", (new Date()).toISOString());
            thing.emitEvent("change", commandDone);
		});
    });

	// expose the thing
	thing.expose().then( () => { console.info(thing.title + " ready"); } );
})
.catch((e) => {
	console.log(e)
});
