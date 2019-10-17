$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoriesTpl', { data: res });
        $('tbody').html(html);
    }
});

// 添加分类
$('#addCategory').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/categories',
        data: $(this).serialize(),
        success: function(res) {
            location.reload();
        }
    });
    return false;
});

// 修改分类
$('tbody').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            var html = template('modifyCategoriesTpl', res);
            $('#formBox').html(html);
        }
    })
});
$('#formBox').on('submit', '#modifyCategory', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function(res) {
            location.reload();
        }
    })
    return false;
})