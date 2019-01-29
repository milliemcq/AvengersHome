$('table').on('click', 'update-button', function() {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.username').text();
    var newName = rowEl.find('.name').val();

    $.ajax({
        url: '/people/' + id,
        method: 'GET',
        contentType: 'application/json',
        //data: JSON.stringify({ newName: newName }),
        success: function(response) {
            console.log(response);
            $('#get-button').click();
        }
    });
});

$(function () {
    $("#get-button").on('click', function() {
        console.log("Get button clicked!!!!!")


        $.ajax({
            url: '/missions',
            contentType: 'application/json',

            success: function (response) {
                var tbodyEl = $('#mission-table-body');
                tbodyEl.html('');
                response.missions.forEach(function (mission) {
                    tbodyEl.append('\
                <tr>\
                    <td class="id">' + mission.id + '</td>\
                    <td>' + mission.threat + '</td>\
                    <td>' + mission.location + '</td>\
                    <td>' + mission.atRiskCount + '</td>\
                    <td>' + mission.heroesAssigned + '</td>\
                    <td>\
                    <button class="delete-button">x</button>\
                    </td>\
                    </tr>\
                ');
                });
                console.log('FINISHED MISSIONS');
            }
        });

        $.ajax({
            url: '/people',
            contentType: 'application/json',

            success: function (response) {
                var tbodyEl = $('#people-table-body');
                tbodyEl.html('');
                response.people.forEach(function (people) {
                    tbodyEl.append('\
                <tr>\
                    <td class="id">' + people.username + '</td>\
                    <td>' + people.forename + '</td>\
                    <td>' + people.surname + '</td>\
                    <td>' + people.alterEgo + '</td>\
                    <td>' + people.abilities + '</td>\
                    <td>\
                    <button class="delete-button">x</button>\
                    </td>\
                    </tr>\
                ');
                });
                console.log('FINSIHED MISSIONS');
            }

        })
    });


        $('#create-avenger-form').on('submit', function(event) {
            const token = localStorage.getItem("token");
            if(token == null){
                console.log("NO TOKEN");
            };

            event.preventDefault();
            console.log("Create avenger form ajax hit");
            var usernameInput = $('#username-input').val();
            var forenameInput = $('#forename-input').val();
            var surnameInput = $('#surname-input').val();
            var alterEgoInput = $('#alter-ego-input').val();
            var abilities = $('#abilities-input').val();

            var data = {
                "username": usernameInput,
                "forename": forenameInput,
                "surname": surnameInput,
                "alterEgo": alterEgoInput,
                "abilities": abilities
            };

            console.log(data);
            $.ajax({
                url: '/people',
                method: 'POST',
                contentType: 'application/json',
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', "bearer " + token)
                },
                data: JSON.stringify(data),
                success: function(response) {
                    console.log("create avenger form");
                    console.log(response);
                    $('#get-button').click();
                    $('#avenger-form-close-button').click();
                },
                error: function(){
                    $('#validation-label').text("Username already in use");
                }
            });
        });



    $('#mission-table').on('click', '.delete-button', function () {
        console.log("close button clicked");
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/missions/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });




    $('#people-table').on('click', '.delete-button',  function () {
        console.log("close button clicked");
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/people/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});

