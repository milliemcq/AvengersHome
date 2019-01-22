//MISSIONS REQUESTS
$(function () {
    // GET HOMEPAGE
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
                    window.location.href = "http://localhost:8090/furyOverview.html";
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




});


