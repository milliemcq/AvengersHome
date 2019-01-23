"use strict"
var express = require('express')
var bodyParser = require('body-parser');

//const app = require('./app');
var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));



var people = [{
                        "username": "doctorwhocomposer",
                        "forename": "Delia",
                        "surname": "Derbyshire",
                        "alterEgo": "The Composer",
                        "abilities" : [ "Composition", "General Awesomeness"],
                        "photo" : "deliad.jpg"
                    },
                    {
                        "username": "bowsnarrows",
                        "forename": "Clint",
                        "surname": "Barton",
                        "alterEgo": "Hawkeye",
                        "abilities" : [ "Archery", "Supersight"],
                        "photo" : "hawkeye.jpg"
                    },
                    {
                        "username": "theking",
                        "forename": "Tony Stark",
                        "surname": "Stark",
                        "alterEgo": "Iron Man",
                        "abilities" : [ "Super Strength", "Rocket Blasters", "Insane Intelligence"],
                        "photo" : "ironman.jpg"
                    },
                    {
                        "username": "capA123",
                        "forename": "Steve",
                        "surname": "Rodgers",
                        "alterEgo": "Captain America",
                        "abilities" : [ "Super Human", "Vibranium Shield"],
                        "photo" : "ironman.jpg"
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


app.post('/people', ensureToken, function(req, res) {
    console.log("Adding an Avenger");
    people.forEach(function(person, index) {
        console.log(req.body.username)
        console.log(person.username);
        if (person.username == req.body.username || person.username == req.headers.username) {
            res.sendStatus(400);
            console.log("detected duplicate avenger")
            return;
        }
        ;
    });

    people.push({
        "username": req.body.username,
        "forename": req.body.forename,
        "surname": req.body.surname,
        "alterEgo": req.body.alterEgo,
        "abilities": req.body.abilities
    });
    //console.log(people);

    res.send('Successfully created Avenger!');
});

app.get('/thanos', function(req, res) {
    var n = Math.round(people.length/2);
    people.splice(0, n);
    res.send("Deleted People");
});


app.get('/people', function(req, resp){
    console.log("Returning people");
    resp.send({people: people});
});

var findUser = function (username) {

    for(var i = 0; i < people.length; i++){
        if (people[i].username == username){
            return people[i];
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
    else {
        resp.json({
            message: 'Incorrect Username/Password',
            token: null
        });
    }


});


function ensureToken(req, res, next) {
    if(req.headers.access_token == 'concertina'){
        next();
    };
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        if(bearerToken !== 'concertina'){
            console.log("sending 403");
            res.sendStatus(403);
            return;
        }
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

app.listen(8090);

module.exports = app;