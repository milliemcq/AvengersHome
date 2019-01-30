$('table').on('click', 'update-button', function() {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.username').text();
    var newName = rowEl.find('.name').val();

    $.ajax({
        url: '/people/' + id,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            $('#get-button').click();
        }
    });
});

$(function () {
    $("#get-button").on('click', function () {

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
                    <button type="button" class="btn btn-link">\
                     <a id="add-button" href="#" data-toggle="modal" data-target="#assign-hero-modal">Assign Heroes</a>\
                     </button>\
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
                var avengerDropdown = document.getElementById("avenger-dropdown");
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

                let dropdown = $('#avenger-dropdown');

                dropdown.empty();

                dropdown.append('<option selected="true" disabled>Choose Avenger</option>');
                dropdown.prop('selectedIndex', 0);


                $.each(response.people, function (key, entry) {
                    console.log("Adding Avenger to Dropdown")
                    dropdown.append($('<option></option>').attr('value', entry.username).text(entry.forename));
                })
            }
        });


    });
})


    $('#create-avenger-form').on('submit', function (event) {
        const token = localStorage.getItem("token");
        if (token == null) {
            console.log("NO TOKEN");
        }
        ;

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
            success: function (response) {
                console.log("create avenger form");
                console.log(response);
                $('#get-button').click();
                $('#avenger-form-close-button').click();
            },
            error: function () {
                $('#validation-label').text("Username already in use");
            }
        });
    });

$('#add-avenger-form').on('submit', function (event) {
    const token = localStorage.getItem("token");
    if (token == null) {
        console.log("NO TOKEN");
    }
    ;

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
        success: function (response) {
            console.log("create avenger form");
            console.log(response);
            $('#get-button').click();
            $('#avenger-form-close-button').click();
        },
        error: function () {
            $('#validation-label').text("Username already in use");
        }
    });
});


    $('#mission-table').on('click', '.delete-button', function () {
        console.log("Delete button clicked");
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

    $('#mission-table').on('click', '.assign-heroes-button', function () {
        console.log("Assign heroes button clicked");
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/assignHeroes',
            method: 'POST',
            contentType: 'application/json',
            success: function (response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });


    $('#people-table').on('click', '.delete-button', function () {
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



