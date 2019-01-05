$(function () {
    // GET/READ
    $("#get-button").on('click', function() {
       $.ajax({
           url: '/missions',
           contentType: 'application/json',
           success: function (response) {
               var tbodyEl = $('tbody');
               console.log('BEFORE REMOVE BODY');
               tbodyEl.html('');
               response.missions.forEach(function (mission) {
                   tbodyEl.append('\
                    <tr>\
                        <td>' + mission.threat +'</td>\
                        <td>' + mission.location + '</td>\
                        <td>' + mission.atRiskCount +'</td>\
                        <td>' + mission.heroesAssigned+ '</td>\
                        <td>\
                        <button> UPDATE/PUT Button </button>\
                        <button> DELETE Button </button>\
                        </td>\
                    </tr>\
                    ');
               });
               console.log('FINSIHED');
           }
       });
    });

    //CREATE/POST
    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});