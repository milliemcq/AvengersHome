$(document).ready(function () {

    $("#get-button").on('click', function() {
        $.ajax({
            url: '/missions',
            contentType: 'application/json',
            success: function (response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                response.missions.forEach(function (mission) {
                    tbodyEl.append('\
                    <tr>\
                        <td>' + mission.threat +'</td>\
                        <td>' + mission.location + '</td>\
                        <td>' + mission.atRiskCount +'</td>\
                        <td>' + mission.heroesAssigned+ '</td>\
                        </tr>\
                    ');
                });
                console.log('FINISHED');
            }
        });
    });


    console.log("Document ready clicking get button");
    $('#get-button').click();

    $.getJSON('data.json',
        function(data) {
            var biggestRisk = data.missions[0].atRiskCount;
            var biggestRiskEvent = data.missions[0].threat
            for (var i = 0; i < data.missions.length; i++) {
                if(data.missions[i].atRiskCount > biggestRisk){
                    biggestRisk = data.missions[i].atRiskCount;
                    biggestRiskEvent = data.missions[i].threat;
                }
            }
            console.log(data.toString())
            $("#greatest-threat-label").text(biggestRiskEvent);




        });

    $.getJSON('data.json',
        function(data) {

            $("#numberOfMissions").text(data.missions.length);
            startCounting();

        });






});

function startCounting()
{

    $('.counter').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 10000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
};



$(function () {
    // GET HOMEPAGE

    $("#thanos-button").on('click', function() {
        $.ajax({
            url: '/thanos',
            method: 'GET',
            contentType: 'application/json',
            //data: JSON.stringify(data),
            success: function(response) {
                console.log(response);
            }
        });
    });

    //GET FURY OVERVIEW

    //CREATE/POST
    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var threatNameInput = $('#threat-name-input').val();
        var threatLocationInput = $('#threat-location-input').val();
        var atRiskCountInput = $('#num-at-risk-input').val();

        var data = {
            "threat": threatNameInput,
            "location": threatLocationInput,
            "atRiskCount": atRiskCountInput
        };

        $.ajax({
            url: '/missions',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                console.log("hellO!");
                console.log(response);

                $('#get-button').click();
                $('#mission-form-close-button').click();
            }
        });
    });

    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        var username = $('#username-input').val();
        var password = $('#password-input').val();

        console.log("Login form submitted")

        data = {
            "username": username,
            "password": password
        };

        $.ajax({
            url: '/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                console.log("hellO!");
                console.log(response);
                if(response.token != null) {
                    localStorage.setItem("token", response.token);
                    if(response.token === "concertina") {
                        //TODO Change this so it works in the cloud
                        window.location.href = "http://localhost:8090/furyOverview.html";
                        $('#login-nav-label').empty()
                        $('#login-nav-label').text('Logout');
                    }
                    else{
                        var user = response.userjson;
                        console.log(user);
                        $('#login-form-close-button').click();
                        $('#container').hide();

                        $('#id-label').text(user.username);
                        $('#first-name-label').text(user.forename);
                        $('#surname-label').text(user.surname);
                        $('#alter-label').text(user.alterEgo);
                        document.getElementById("profile-image").src = user.photo;
                        $("#abilities-list").empty();
                        $.each(user.abilities, function(i, v, d) {
                            $("#abilities-list").append('<li>' + v  + '</li>');
                        });
                        $('#login-nav-label').empty()
                        $('#login-nav-label').text('Logout');
                        $('#profile-content').show();
                        $('#profile-content').fadeIn('slow');


                    }
                }
                else{
                    $('#validation-label').text(response.message);
                    $('#validation-label').show();

                }
            }
        });
    });

    $("#login-form-close-button").on('click', function() {
        //TODO hide validation label
    });

    $("#thanos-button").on('click', function() {
        console.log("Changing Background");
        var element = document.getElementById( 'full-body' );
        var navelem = document.getElementById( 'avengers-nav' );

        element.style.cssText = "background: #663399;";
        navelem.style.cssText = "background-color: #663399 !important;";
        //element.style.setProperty('background', '#663399 ', 'important');

    });

    $("#home-button").on('click', function() {
        $('#get-button').click();
        console.log("Get button clicked on reload")

    });

    $('#about-button').on('click', function(e) {
        e.preventDefault();
        var url = this.href;
        $('#container').remove();
        $('#profile-content').hide();
        $('#content').load(url + ' #container').hide();
        $('#content').fadeIn('slow');
        $('#get-button').click();


    });

    $('#home-button').on('click', function(e) {
        e.preventDefault();
        var url = this.href;
        $('#container').remove();
        $('#content').load(url + ' #container').hide();
        location.reload(true);
        $('#content').fadeIn('slow');

        $('#get-button').click();


    });


});

function toggle_visibility(id) {
    console.log("changing visability")
    var e = document.getElementById(id);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
        console.log("should show");
}






