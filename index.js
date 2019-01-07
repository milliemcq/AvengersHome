"use strict"
var express = require('express')
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


var people = [
                    {
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

 var admin = {
     "username": "fury",
     "password": "password"
 }


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

app.post('/api/login', (req, res) => {

    // insert code here to actually authenticate, or fake it
    const user = { id: 3 };

    // then return a token, secret key should be an env variable
    const token = jwt.sign({ user: user.id }, 'secret_key_goes_here');
    res.json({
        message: 'Authenticated! Use this token in the "Authorization" header',
        token: token
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


/*
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
        ;
    });
});

app.post('/api/login', (req, res) => {
    jwt.sign({admin}, 'secretkey', {expiresIn: '10h'} (err, token) => {
        res.json({
            token
        });
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});


function verifyToken(req, res, next){
    const bearerHeader = req.headers['authoization'];
    if(typeof bearerHeader !== 'undefined'){
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else{
        console.log("forbidden");
        res.sendStatus(403);
    }
}*/

app.listen(8090)