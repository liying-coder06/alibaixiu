$('#modifyForm').on('submit', function() {
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: $(this).serialize(),
        success: function(res) {
            console.log(res);
            location.href = 'login.html';
        }
    });
    return false;
});