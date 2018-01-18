(function () {
    var url = window.location.search,
    id = url.split('=')[1];
    console.log(id);

    function getDataList() {
        $.ajax({
            type: 'GET',
            url: 'https://api.douban.com/v2/movie/subject/' + id,
            dataType: 'jsonp',
            success: renderPage,
            error: function () {
                console.error('请求失败');
            }
        })
        function renderPage (data) {
            console.log(data);
            var movContent = $(".mov-content");
            $Content = $("<div class='content'></div>")
            $Title = $("<h1>"+ data.title + "    " + "评分:" + data.rating.average +"</h1>")
            $Summary = $("<p>"+ data.summary +"</p>")
            $Img = $("<img src="+ data.images.medium +"></img>");
                   
            movContent.append($Img, $Content.append($Title, $Summary));
        }
    }
    getDataList();
})()