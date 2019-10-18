// 获取分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { data: res });
        $('#category').html(html);
    }
});

// 封面上传
$('#feature').on('change', function() {
    var fd = new FormData();
    fd.append('cover', this.files[0]);

    // 发送ajax
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        // 告诉 $.ajax不要对数据格式进行拼接
        processData: false,
        //告诉 $.ajax不要设置参数类型  默认格式application/x-www-form-urlencoded 
        contentType: false,
        success: function(res) {
            $('#thumbnail').val(res[0].cover);
            $('.thumbnail').attr('src', res[0].cover).show();
        }
    })
});

$('#addForm').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $(this).serialize(),
        success: function(res) {
            location.href = 'posts.html';
        }
    })
    return false;
});