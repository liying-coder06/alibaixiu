// 页面一加载就要显示用户信息
$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        var html = template('usersTpl', { data: res });
        $('#usersBox').html(html);
    }
});

// 用户添加功能
$('#userForm').on('submit', function() {
    // serialize可以获取表单数据, 并且拼接成参数字符串格式
    var formData = $(this).serialize();

    // 调用服务器端接口,添加数据
    $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function() {
                location.reload();
            },
            error: function() {
                alert('添加用户失败');
            }
        })
        // 阻止表单的默认提交行为, 这种方式兼容性最好
    return false;
});

// 头像上传功能, 当用户选择文件时, 这里应用事件委托, 上传和修改时就都可以上传头像了
$('#box').on('change', '#avatar', function() {
    // 创建FormData对象用来实现二进制文件上传
    var formData = new FormData();
    // 为formData添加属性
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉ajax不要解析data请求参数
        processData: false,
        // 告诉ajax不要设置请求参数的类型
        contentType: false,
        success: function(res) {
            // 实现图片预览功能
            $('#preview').attr('src', res[0].avatar);
            // 修改隐藏域的值
            $('#hiddenAvatar').val(res[0].avatar);
        },
        error: function() {
            alert('上传头像失败');
        }
    });
});

// 修改用户
$('#usersBox').on('click', '.edit', function() {
    // 获取当前修改用户的id
    var id = $(this).attr('data-id');

    // 发送请求
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            var html = template('modifyTpl', res);
            $('#box').html(html);
        }
    });
});

$('#box').on('submit', '#modifyForm', function() {
    // 获取当前修改用户的id
    var id = $(this).attr('data-id');
    // 收集表单数据
    var formData = $(this).serialize();

    // 发送请求
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    });
    // 阻止表单的默认提交行为
    return false;
});

// 删除用户
// 给删除按钮注册点击事件, 通过事件委托
$('#usersBox').on('click', '.del', function() {
    // 询问是否确认删除
    if (confirm('确认要删除用户么?')) {
        // 获取要删除用户的id值
        var id = $(this).attr('data-id');

        // 发送请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                // 删除成功后, 刷新当前页面
                location.reload();
            }
        })
    }
});

// 批量删除
$('#checkAll').on('change', function() {
    var bool = $(this).prop('checked');
    if (bool) {
        $('#deleteMany').css('visibility', 'visible');
    } else {
        $('#deleteMany').css('visibility', 'hidden');
    }
    // 获取所有用户复选框
    var checkList = $('#usersBox input[type="checkbox"]');
    checkList.prop('checked', bool);
});

$('#usersBox').on('change', 'input[type="checkbox"]', function() {
    if ($('#usersBox input[type="checkbox"]').length == $('#usersBox input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true);
    } else {
        $('#checkAll').prop('checked', false);
    }

    if ($('#usersBox input[type="checkbox"]:checked').length > 0) {
        $('#deleteMany').css('visibility', 'visible');
    } else {
        $('#deleteMany').css('visibility', 'hidden');
    }
});

$('#deleteMany').on('click', function() {
    if (confirm('确定要删除么?')) {
        var checkList = $('#usersBox input[type="checkbox"]:checked');
        var str = '';
        checkList.each(function(index, item) {
            str += $(item).attr('data-id') + '-';
        })
        str = str.substr(0, str.length - 1);
        $.ajax({
            type: 'delete',
            url: '/users/' + str,
            success: function() {
                location.reload();
            }
        })
    }
});