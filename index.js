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
}

app.get('/', function(req, resp){
    console.log(req)
    resp.send('Hello world' + req.query.title)
})

app.listen(8090)