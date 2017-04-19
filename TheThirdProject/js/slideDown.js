
// ##### VERSION 1.0 #####

// #### ZMIENNE GLOBALNE ####

var navBtn = document.querySelector('#js-nav-btn'); //Przycisk pokazujący/chowający menu
var slideDown = document.querySelector('#js-slideDown'); // Wysuwanie/chowanie menu
var navItem = document.querySelectorAll(".navigation > li"); // Składniki Menu


// #### PROCEDURY FUNKCJI ####

// Wysuwa albo zwija menu
function maxHeightSlide() {

  if(slideDown.classList.contains('slideUp')) {
    slideDown.classList.remove('slideUp');
    slideDown.classList.add('slideDown');
  }
  else {
    slideDown.classList.remove('slideDown');
    slideDown.classList.add('slideUp');
  }
  return false;
}

//usuwa klasę active ze wszytskich składników menu
function removeActiveState() {

  var nameClass = /(?:^|\s)active(?!\S)/g;

  for (var i = 0 , size = navItem.length ; i < size ; i++ ) {
    navItem[i].className = navItem[i].className.replace(nameClass,'');
  }
}

  for (var i = 0, size = navItem.length; i < size; i++) {
    navItem[i].addEventListener('click', function (evt) {
      removeActiveState();
      this.className += ' active';
    });
   }

   function fadeInText () {

     var scrollTop = document.body.scrollTop;
     var startAnimate = document.querySelector("#js-animateText");

     if( scrollTop <= 100) {
       startAnimate.classList.add('animate_start');
       window.removeEventListener('scroll', fadeInText);
       window.removeEventListener('load', fadeInText);
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
       for (var i=0, size= allSections.length ; i < size; i++)
       allSections[i].style.paddingLeft = "0";
     }
   }

// #### NASŁUCHIWANIE ZDARZEŃ ####

   navBtn.addEventListener('click',maxHeightSlide,false);
   window.addEventListener('scroll',fadeInText,false);
   document.addEventListener('DOMContentLoaded',fadeInText,false);
   window.addEventListener('scroll',showFixedMenu,false);
   document.addEventListener('DOMContentLoaded',showFixedMenu,false);
