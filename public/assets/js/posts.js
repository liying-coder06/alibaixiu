// 文章列表页展示
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
    }
});

function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
// 方式一: 
//template.defaults.imports.dateFormat = dateFormat;