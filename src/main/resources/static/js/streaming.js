// 동작코드 시작

$('.teacher>div:first-child').click(function(){
    $("#pop_up").addClass("active");
})
$('.image-btn>button').click(function(){
    $("#pop_up").removeClass("active");
})


$(document).ready(function() {
   
    $('.slidemenu').css('right', '-300px');

    $('.hamburger').click(function() {
        $('.slidemenu').stop(true, true).delay(100).animate({ right: '0' }, 1000);
    });

    $('.closeSideMenu > button').click(function() {
        $('.slidemenu').stop(true, true).delay(100).animate({ right: '-300px' }, 1000);
    });
});

// 동작코드 끝