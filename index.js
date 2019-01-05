"use strict"
var express = require('express')
var app = express()

var users = {
    "users": [
        {
            "username": "capA123",
            "forename": "Steve",
            "surname": "Rodgers",
            "alterEgo": "Captain America"
        },
        {
            "username": "bowsnarrows",
            "forename": "Clint",
            "surname": "Barton",
            "alterEgo": "Hawkeye"
        },
        {
            "username": "theking",
            "forename": "Tony Stark",
            "surname": "Stark",
            "alterEgo": "Iron Man"
        },
        {
            "username": "doctorwhocomposer",
            "forename": "Delia",
            "surname": "Derbyshire",
            "alterEgo": "The Composer"
        }
    ]
};

var missions = [
        {
            "id": 1,
            "threat": "Brexit",
            "location": "London",
            "atRiskCount": 70000000,
            "heroesAssigned" : [ "capA123", "doctorwhocomposer"]

        },

        {
            "id": 2,
            "threat": "Trump",
            "location": "America",
            "atRiskCount": 300000000,
            "heroesAssigned" : [ "capA123", "bowsnarrows"]

        },

        {
            "id": 3,
            "threat": "Thanos",
            "location": "Whole Universe",
            "atRiskCount": 10000000000000000,
            "heroesAssigned" : [ "theking", "capA123", "doctorwhocomposer"]
        }
    ]

var currentMissionId = 3;

app.use(express.static('public'));

app.get('/missions', function(req, resp){
    resp.send({missions: missions});
});

app.post('/missions', function(req, res) {
    console.log("HEREHEREHEREHhHHHHHHHUHOFUHWSEOIF JOEIJFOEIJFOIEWFH:OIEJF:OIEWJF:OEIWJF:OIEWJ:FOIEWJ:OF")
    console.log(req);
    var missionName = req.body;
    currentMissionId++;

    missions.push({
        id: currentMissionId,
        threat: missionName
    });

    res.send('Successfully created mission!');
});

app.listen(8090)