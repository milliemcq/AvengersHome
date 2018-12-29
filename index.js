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

app.use(express.static('public'));

app.get('/missions', function(req, resp){
    console.log(req)
    resp.send('Hello world' + users)
})

app.listen(8090)