// 文件上传
$('#logo').on('change', function() {
    var fd = new FormData();
    fd.append('logo', this.files[0]);
    // 发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function(res) {
            $('#hiddenLogo').val(res[0].logo);
            $('#preview').attr('src', res[0].logo);
        }
    })
});