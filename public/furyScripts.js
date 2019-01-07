$(function () {
    $(document).ready(function () {
        var tbodyEl = $('tbody');
        $.getJSON('data.json',
            function(data) {
                console.log('BEFORE REMOVE BODY');
                tbodyEl.html('');
                data.missions.forEach(function (mission) {
                    tbodyEl.append('\
                    <tr>\
                        <td>' + mission.id + '</td>\
                        <td>' + mission.threat +'</td>\
                        <td>' + mission.location + '</td>\
                        <td>' + mission.atRiskCount +'</td>\
                        <td>' + mission.heroesAssigned+ '</td>\
                        <td>\
                        <button class="update-button"> UPDATE/PUT Button </button>\
                        <button id="delete-button" type="button" class="close" data-dismiss="modal">x</button>\
                        </td>\
                    </tr>\
                    ');
                });
            });
    });

    // UPDATE/PUT
    $('table').on('click', 'delete-button', function() {
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



}