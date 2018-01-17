(function () {
    var searchSug = $('.search-suggest'),
        timer = null;

    function deBounce(func, delay) {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    }

    $('#input-text').keyup(function () {
        deBounce(getDataList, 500);
    });

    function getDataList() {
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search?q=' + $('#input-text').val() + '&count=7',
            dataType: 'jsonp',
            success: renderList,
            error: function () {
                console.error('请求失败');
            }
        })
        function renderList(data) {
            console.log(data);
            if (data.count > 0) {
                searchSug.html('');
                var tempStr = '';
                var sgUl = $("<ul></ul>");
                data = data.subjects;
                data.forEach(function (ele, index) {
                    var $Li = $("<li></li>"),
                        $A = $("<a href='" + ele.alt + "'></a>"),
                        $Img = $("<img src=" + ele.images.small + ">"),
                        $P1 = $("<p>" + ele.title + "</p>");
                    sgUl.append($Li.append($A.append($Img, $P1)));
                })
                sgUl.appendTo(searchSug);
                searchSug.css('display', 'block');
            }else {
                searchSug.css('display', 'none');
            }
        }
    }
})()