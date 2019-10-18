$.ajax({
    type: 'get',
    url: '/comments',
    success: function(res) {
        var html = template('commentsTpl', res);
        $('tbody').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);
    }
});

function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(res) {
            var html = template('commentsTpl', res);
            $('tbody').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    });
};

$('tbody').on('click', '.status', function() {
    var id = $(this).parent().attr('data-id');
    var status = $(this).parent().attr('data-status');

    $.ajax({
        type: 'put',
        url: `/comments/${id}`,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function() {
            location.reload();
        }
    })
});

$('tbody').on('click', '.delete', function() {
    if (confirm('确定要删除评论么?')) {
        var id = $(this).parent().attr('data-id');

        $.ajax({
            type: 'delete',
            url: `/comments/${id}`,
            success: function() {
                location.reload();
            }
        })
    }
})