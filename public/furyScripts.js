
$(document).ready(function () {
    console.log("inside fury script");
    $.ajax({
        url: '/missions',
        contentType: 'application/json',
        success: function (response) {
            var tbodyEl = $('#mission-table-body');
            tbodyEl.html('');
            response.missions.forEach(function (mission) {
                tbodyEl.append('\
                <tr>\
                    <td>' + mission.id + '</td>\
                    <td>' + mission.threat + '</td>\
                    <td>' + mission.location + '</td>\
                    <td>' + mission.atRiskCount + '</td>\
                    <td>' + mission.heroesAssigned + '</td>\
                    <td>\
                    <button class="update-button">Update</button>\
                    <button class="delete-button">x</button>\
                    </td>\
                    </tr>\
                ');
            });
            console.log('FINSIHED');
        }
    })
});

$(document).ready(function () {
    console.log("inside fury script");
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
                    <td>\
                    <button class="update-button">Update</button>\
                    <button class="delete-button">x</button>\
                    </td>\
                    </tr>\
                ');
            });
            console.log('FINSIHED');
        }

    })
});


$('table').on('click', 'delete-person-button', function() {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.username').text();
    var newName = rowEl.find('.name').val();

    $.ajax({
        url: '/people/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ newName: newName }),
        success: function(response) {
            console.log(response);
            $('#get-button').click();
        }
    });
});

$(function () {
    $("#get-button").on('click', function() {
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
                    <button class="update-button">Update</button>\
                    <button class="delete-button">x</button>\
                    </td>\
                    </tr>\
                ');
                });
                console.log('FINSIHED');
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
                    <td>\
                    <button class="update-button">Update</button>\
                    <button class="delete-button">x</button>\
                    </td>\
                    </tr>\
                ');
                });
                console.log('FINSIHED');
            }

        })

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
});
