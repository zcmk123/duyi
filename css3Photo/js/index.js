window.onload = function () {
    $('.loading').animate({opacity: '0' }, 300, function () {
        $('.loading').css('display', 'none');
    });
    setTimeout(function () {
        $('.wrapper').removeClass('init');
    }, 100)
    $('.slice').on('click', function (e) {
        e.stopPropagation();
        $('.wrapper').addClass('click');
        $(this).addClass('active');
    })
    $('.close').on('click', function (e) {
        e.stopPropagation();
        $('.wrapper').removeClass('click');
        $('.slice').removeClass('active');
    })
}
