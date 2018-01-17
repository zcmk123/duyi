(function () {
    var oLiList = document.getElementsByClassName('container');
    var num = 1;
    var initWidth = 200;
    var flag = false;
    function requestData () {
        if(!flag) {
            flag = true;
            ajax('GET', 'http://localhost/waterfall/js/getPics.php', insertDom, 'cpage=' + num, true);
            num++;
        }
    }
    requestData();
    //回调函数
    function insertDom (data) {
        var dataList = JSON.parse(data);
        if(dataList.length > 0){
            renderList(dataList);
        }
    }
    function renderList (dataList) {
        dataList.forEach(function (ele, index) {
            var smallestIndex = getSmallestLiIndex(oLiList),
                oItem = document.createElement('div'),
                oImg = document.createElement('img'),
                oContent = document.createElement('div'),
                oP =  document.createElement('p');
                oContent.className = 'content';
                oItem.className = 'item';
                //处理图片
                oImg.src = ele.preview;
                oImg.height = ele.height * initWidth / ele.width;
                //图片错误
                oImg.onerror = function () {
                    this.style.width = '202px';
                    this.style.height = ele.height * initWidth / ele.width + 2;
                    this.style.margin = '-1px';
                }
                oContent.style.height = ele.height * initWidth / ele.width;
                oP.innerHTML = ele.title;
                oContent.appendChild(oImg);
                oItem.appendChild(oContent);
                oLiList[smallestIndex].appendChild(oItem);
        })
        //不继续加载
        flag = false;
    }
    function getSmallestLiIndex (list) {
        var minHeight = list[0].offsetHeight,
            i = 1,
            smallestIndex = 0;
        while(i < list.length) {
            var minH = list[i].offsetHeight;
            if(minH < minHeight) {
                minHeight = minH;
                smallestIndex = i;
            }
            i++;
        }
        return smallestIndex;
    }
    window.onscroll = function () {
        //兼容
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var pageHeigh = oLiList[getSmallestLiIndex(oLiList)].offsetHeight;
        if(scrollHeight + clientHeight > pageHeigh) {
            requestData();
        }
    }
})()