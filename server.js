"use strict"
var express = require('express')
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


var people = [{
                        "username": "doctorwhocomposer",
                        "forename": "Delia",
                        "surname": "Derbyshire",
                        "alterEgo": "The Composer"
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
                        "username": "capA123",
                        "forename": "Steve",
                        "surname": "Rodgers",
                        "alterEgo": "Captain America"
                    }];



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
                    }];


 var admin = {
     "username": "fury",
     "password": "password"
 }


var currentMissionId = 3;

app.use(express.static('public'));

app.get('/missions', function(req, resp){
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


app.post('/people', function(req, res) {
    console.log("Adding an Avenger");

    people.push({
        "username": req.body.username,
        "forename": req.body.forename,
        "surname": req.body.surname,
        "alterEgo": req.body.alterEgo
    });
    console.log(people);

    res.send('Successfully created Avenger!');
});

app.get('/people', function(req, resp){
    resp.send({people: people});
});

var findUser = function (username) {

    for(var i = 0; i < people.length; i++){
        if (people.username == username){
            return people;
        }
    }
    return "No User with that name found";
};

app.get('/people/:username', function(req, resp) {
    var username = req.params.username;
    var response = findUser(username);
    resp.send(response);
});

app.get('/api', function api(req, res) {
    res.json({
        description: 'My API. Please authenticate!'
    });
});

app.post('/login', (req, resp) => {
    console.log("checking login credentials");
    console.log(req);
    if(req.body.username === admin.username && req.body.password == admin.password)
    {
        const token = "concertina"
        resp.json({
            message: 'Authenticated! Use this token in the "Authorization" header',
            token: token
        });
    }
    resp.json({
        message: 'Incorrect Username/Password',
        token: null
    });


});

app.get('/api/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'secret_key_goes_here', function(err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                description: 'Protected information. Congrats!'
            });
        }
    });
});

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}




app.delete('/people/:username', function(req, res) {
    console.log("Deleting value in server")
    var id = req.params.username;

    var found = false;

    people.forEach(function(person, index) {
        if (!found && person.username === id) {
            console.log("found and deleting");
            console.log(index.toString());
            console.log(person);
            people.splice(index, 1);
        }
    });

    res.send('deleted person');
});

app.delete('/missions/:id', function(req, res) {
    console.log("Deleting value in server")
    var id = req.params.id;

    var found = false;

    missions.forEach(function(mission, index) {
        if (!found && mission.id === Number(id)) {
            console.log("found and deleting");
            console.log(index.toString());
            console.log(mission);
            missions.splice(index, 1);
        }
    });

    res.send('deleted mission');
});

app.listen(8090)