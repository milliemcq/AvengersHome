"use strict"
var express = require('express')
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


var people = [
                    {
                        "id" : 4,
                        "username": "doctorwhocomposer",
                        "forename": "Delia",
                        "surname": "Derbyshire",
                        "alterEgo": "The Composer"
                    },
                    {
                        "id" : 2,
                        "username": "bowsnarrows",
                        "forename": "Clint",
                        "surname": "Barton",
                        "alterEgo": "Hawkeye"
                    },
                    {
                        "id" : 3,
                        "username": "theking",
                        "forename": "Tony Stark",
                        "surname": "Stark",
                        "alterEgo": "Iron Man"
                    },
                    {
                        "username": "capA123",
                        "forename": "Steve",
                        "surname": "Rodgers",
                        "alterEgo": "Captain America"
                    }
                ];

var missions = [
                    {
                        "id" : 1,
                        "threat": "Brexit",
                        "location": "London",
                        "atRiskCount": 70000000,
                        "heroesAssigned" : [ "capA123", "doctorwhocomposer"]

                    },

                    {
                        "id" : 2,
                        "threat": "Trump",
                        "location": "America",
                        "atRiskCount": 300000000,
                        "heroesAssigned" : [ "capA123", "bowsnarrows"]

                    },

                    {
                        "id" : 3,
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

app.get('/furyOverview', function(req, resp){
    resp.send({missions: missions});
});

app.post('/missions', function(req, res) {

    currentMissionId++;

    missions.push({
        "id": currentMissionId,
        "threat": req.body.threat,
        "location": req.body.location,
        "atRiskCount": req.body.atRiskCount
    });
    console.log(missions);

    res.send('Successfully created mission!');
});

app.get('/people', function(req, resp){
    resp.send({people: people});
});



app.listen(8090)