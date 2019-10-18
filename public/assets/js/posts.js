// 文章列表页展示
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('.pagination').html(page);
    }
});

function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
// 方式一: 
//template.defaults.imports.dateFormat = dateFormat;

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page: page },
        success: function(res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    });
};

// 获取分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        var html = template('categoryTpl', { data: res });
        $('#categoryBox').html(html);
    }
});

// 实现数据筛选
$('#filterForm').on('submit', function() {
    // 收集表单数据
    var fd = $(this).serialize();

    // 发送ajax
    $.ajax({
        type: 'get',
        url: '/posts',
        data: fd,
        success: function(res) {
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('.pagination').html(page);
        }
    });
    // 切记要阻止表单的默认提交行为
    return false;
})