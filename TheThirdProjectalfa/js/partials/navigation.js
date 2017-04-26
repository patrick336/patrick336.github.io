$(document).ready(function(){

  // ##### VERSION 1.0 #####

  // #### ZMIENNE GLOBALNE ####

  var navBtn = document.querySelector('#js-nav-btn'); //Przycisk pokazujący/chowający menu
  var slideDown = document.getElementById('js-slideDown'); // Wysuwanie/chowanie menu
  var navItem = document.querySelectorAll(".navigation>li"); // Składniki Menu


  // ###### PROCEDURY FUNKCJI ######

  function hasClasss (el,className) {

    if (el.classList)
      return el.classList.contains(className);
    else
      return RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  // Wysuwa albo zwija menu
  function maxHeightSlide() {

    var slideUpClass = /(?:^|\s)slideUp(?!\S)/g;
    var slideDownClass = /(?:^|\s)slideDown(?!\S)/g;


    if(hasClasss(slideDown,"slideUp")) {
      slideDown.className = slideDown.className.replace(slideUpClass,'');
      slideDown.className +=' slideDown';
    }
    else {
      slideDown.className = slideDown.className.replace(slideDownClass,'');
      slideDown.className +=' slideUp';
    }
    return false;
  }

  //usuwa klasę active ze wszytskich składników menu
  // function removeActiveState() {
  //
  //   var nameClass = /(?:^|\s)active(?!\S)/g;
  //
  //   for (var i = 0 , size = navItem.length ; i < size ; i++ ) {
  //     navItem[i].className = navItem[i].className.replace(nameClass,'');
  //   }
  // }

  // function dropdownItems () {
  //
  //   var nameClass = /(?:^|\s)active(?!\S)/g;
  //
  //   for (var i = 0, size = navItem.length; i < size; i++) {
  //     navItem[i].addEventListener('click', function (evt) {
  //
  //       if(hasClass(this,"active")) {
  //          navItem[i].className = navItem[i].className.replace(nameClass,'');
  //       }
  //       else {
  //         removeActiveState();
  //         this.className += ' active';
  //       }
  //     });
  //   }
  // }

  function fadeInText () {

    var scrollTop = document.body.scrollTop;
    var startAnimate = document.querySelector("#js-animateText");

    if( scrollTop <= 100) {
      startAnimate.classList.add('animate_start');
      window.removeEventListener('scroll', fadeInText);
      document.removeEventListener('load', fadeInText);
    }

    return false;
  }


  var sideNavbar = document.getElementById('js-sideNavbar');
  var allSections = document.querySelectorAll('section');

  function showFixedMenu () {

    // Pobierz odległośc od górnej krawędzi okna
    var scrollTop = document.body.scrollTop;
    // Pobierz wysokość pierwszej sekcji
    var offsetHeight = document.getElementById('slider').offsetHeight;

    if(scrollTop >= offsetHeight) {
      sideNavbar.classList.remove('hideFixedMenu');
      sideNavbar.classList.add('showFixedMenu');
      for (var i=0, size= allSections.length ; i < size; i++)
      allSections[i].style.paddingLeft = "283px";
    }
    else {
      sideNavbar.classList.remove('showFixedMenu');
      sideNavbar.classList.add('hideFixedMenu');
      for (var i=0, size = allSections.length ; i < size; i++)
      allSections[i].style.paddingLeft = "0";
    }
  }

  // #### NASŁUCHIWANIE ZDARZEŃ ####

  navBtn.addEventListener('click',maxHeightSlide,false);
  window.addEventListener('scroll',fadeInText,false);
  document.addEventListener('DOMContentLoaded',fadeInText,false);
  window.addEventListener('scroll',showFixedMenu,false);
  document.addEventListener('DOMContentLoaded',showFixedMenu,false);
  window.addEventListener('load',showFixedMenu,false);


  $('a[href*="#"]').click(function(e) { e.preventDefault();});

  $('.navigation > li').click(function(){

    $('.navigation > li').not($(this)).removeClass('active');

    if(!$(this).hasClass('active')) {
      //jeśli nie ma tej klasy to dodaj
      $(this).addClass('active');
    }
    else {
      $(this).removeClass('active');
    }
  });

  $('.navigation>li>a').click(function(){

    $(".navigation ul").slideUp();

    if(!$(this).next().is(":visible"))
    {
      $(this).next().slideDown();
    }
  });

});// document ready
