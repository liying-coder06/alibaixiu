$.ajax({
    type: 'get',
    url: '/slides',
    success: function(res) {
        var html = template('slidesTpl', { data: res });
        $('tbody').html(html);
    }
});

// 上传图片
$('#file').on('change', function() {
    var fd = new FormData();
    fd.append('cover', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function(res) {
            $('#hiddenImg').val(res[0].cover);
            $('.thumbnail').attr('src', res[0].cover).show();
        }
    })
});

// 实现添加功能
$('#slidesForm').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/slides',
        data: $(this).serialize(),
        success: function(res) {
            location.reload();
        }
    })
});

// 删除功能
$('tbody').on('click', '.delete', function() {
    if (confirm('确定要删除么?')) {
        var id = $(this).attr('data-id');

        $.ajax({
            type: 'delete',
            url: `/slides/${id}`,
            success: function() {
                location.reload();
            }
        })
    }
});