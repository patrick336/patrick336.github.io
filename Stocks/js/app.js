//
//  Global namespace
//
var App = (function () {

    // Global Event Listeners
    // var init = function () {

    // };

    //
    // Private methods
    //

    // var iOsHoverFixer = function () {
    //     var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    //     if (!iOS) {
    //         $("body").addClass('non-touch-devices');
    //     } else {
    //         $("*").on('touchstart', function () {
    //             $(this).trigger('hover');
    //         }).on('touchend', function () {
    //             $(this).trigger('hover');
    //         });
    //     }
    // };

    // var btnScrollDown = function () {
    //     $("#js-scrollDown").on('click touchstart', function (e) {
    //         e.preventDefault();

    //         var offset = $(".nav-offset-scroll").outerHeight();
    //         var scrollTo = $('#scrollDown').offset().top;

    //         $('html, body').animate({
    //             scrollTop: scrollTo-offset
    //         }, 900);
    //     });
    // };

    // var btnToggle = function () {
    //     var btn = $('.navbar-toggler');
    //     var collapse = $('.navbar-collapse');

    //     btn.on('click', function () {
    //         if (!collapse.hasClass('collapsing'))
    //             btn.toggleClass('open');
    //     });
    // };

    var scrollTo = function () {

        $('[data-scroll]').on('click touchstart', function(e) {
            $.fn.fullpage.moveSectionDown();
        });
    }
    var portfolioInit = function () {
        $(".portfolio-carousel").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            fade: false,
            maxWidth: false,
            autoplay: true,
            autoplaySpeed: 30000,
            adaptiveHeight: false,
            speed: 600,
            //prevArrow: '<button class="arrow  arrow-prev"> <img class="img-fluid" src="./img/arrowL_black.png"/> </button>',
            //nextArrow: '<button class="arrow arrow-next"> <img class="img-fluid" src="./img/arrowR_black.png"/> </button>'
        });
    };

    // var initAos = function () {
    //     AOS.init({
    //         delay: 100,
    //         duration: 500,
    //         easing: 'ease-out-sine',
    //         disable: 'mobile',
    //         once: 'true'
    //     });
    // };



    // Public methods
    return {
        portfolioInit: portfolioInit,
        scrollTo: scrollTo
    };

})();

$(function () {
    // $('#fullpage').fullpage({
    //     anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
    //     autoScrolling: true, //scroll
    //     verticalCentered: false //flex
    // });
    $('#fullpage').fullpage({
        //anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        autoScrolling: true, //scroll
        scrollHorizontally: true,
        verticalCentered: false, //flex
        fixedElements: '#footer'
    });

    App.portfolioInit();
    App.scrollTo();
});
