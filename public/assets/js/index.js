$('#logout').on('click', function() {
    var isConfirm = confirm('确定要退出么?');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(res) {
                // 退出成功, 跳转到登录页面
                location.href = 'login.html';
            },
            error: function() {
                console.log('退出失败');
            }
        })
    }
})