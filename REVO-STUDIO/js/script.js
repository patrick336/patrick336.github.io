$(function() {
// Zmienne globalne
	var content = $('.person-container');
	var contentLength = content.find('.person').length;
	var dot = $('.dots').find('.dot');
	var current = 0;
	var offset = 400;
	var timer1 = 0;
	// Funkcje
	setAnimate();
	timer1 = setTimeout(next, 10000);

	function setAnimate() {
		var temp = $('.dots').find('div');
		temp.each(function (index, value) {
			$(value).attr('data-tmp', index);
		});
		content.first().show();
		dot.first().addClass('active-dot');
	}

	function next() {
		current++;
		change();
	}

	function setDot() {
		dot.removeClass('active-dot');
		dot.eq(current).addClass('active-dot');
	}

	function change() {
		if (current < 0) current = contentLength - 1;
		if (current > contentLength - 1) current = 0;
		setDot();
		content.animate({
			'marginTop': -(current % contentLength) * offset
		}, 1000);
		timer1 = setTimeout(next, 10000);
	}
	// Nasłuchiwanie zdarzeń
	dot.click(function () {
		clearTimeout(timer1);
		current = $(this).attr('data-tmp');
		change();
	});
}); //ready;
$(function() {   
    $('#js-newsletter-form').submit(function (e) {
        e.preventDefault();
        alert("Żądanie do serwera zostało zatrzymane.\nBrak skryptu obsługującego formularz.\nZa utrudnienia przepraszamy.\nTeam REVO STUDIO");
    });
    $('#js-contact-us-form').submit(function (e) {
        confirm('Wysłać wiadomość ?');
        e.preventDefault();
        alert("Żądanie do serwera zostało zatrzymane.\nBrak skryptu obsługującego formularz.\nZa utrudnienia przepraszamy.\nTeam REVO STUDIO");
    });
 }); //ready

;
$(function() {

// Informacje o zdjęciach 
	var data =  {

	"slider" : [
		{
			"position" : [
				{
					"src" : "./images/compressed/sliders-images/photo-1.jpeg",
					"title" : "photo-1",
					"alt" : "photo-1"
				},
				{
					"src" : "./images/compressed/sliders-images/photo-2.jpeg",
					"title" : "photo-2",
					"alt" : "photo-2"
				},
				{
					"src" : "./images/compressed/sliders-images/photo-3.jpeg",
					"title" : "photo-3",
					"alt" : "photo-3"
				}
			]
		},
		{
			"position" : [
				{
					"src" : "./images/compressed/sliders-images/photo-4.jpeg",
					"title" : "photo-4",
					"alt" : "photo-4"
				},
				{
					"src" : "./images/compressed/sliders-images/photo-5.jpeg",
					"title" : "photo-5",
					"alt" : "photo-5"
				},
				{
					"src" : "./images/compressed/sliders-images/photo-6.jpeg",
					"title" : "photo-6",
					"alt" : "photo-6"
				}
			]
		},
		{
			"position" : [
				{
					"src" : "./images/compressed/sliders-images/photo-7.jpeg",
					"title" : "photo-7",
					"alt" : "photo-7"
				},
				{
					"src" : "./images/compressed/sliders-images/photo-8.jpeg",
					"title" : "photo-8",
					"alt" : "photo-8"
				},
				{
					"src" : "./images/compressed/sliders-images/photo-9.jpeg",
					"title" : "photo-9",
					"alt" : "photo-9"
				}
			]
		}
	]
};

	$('.blog-sliders').css({ height: '320px'});
	$('.caption').show();
	
	function setSlider() {
		var temp = $('.blog-sliders');
		temp.each(function (index, value) {
			$(value).attr('data-index',index);
		});
	}
	function setImage () {
	 	var indexImage = $('.blog-sliders > img');
	 	indexImage.each(function (index,value){
	 		$(value).attr('indexImage',0);
	 	});
	}
	function nextSlide() {
		//Aktualna pozycja na ekranie
		var pos = $(this).siblings('img').attr('indexImage');
		//Pozycja następnego zdjęcia.
		pos++;
		//Pobieramy index slajdu ,który się uakywnił.
		var nrSlider = $(this).parent().attr('data-index');
		//Pobieramy obiekt obrazu,który właśnie się uaktywnił
		var $element = $(this).siblings('img');
		// Pobieramy ilość zdjęć aktywnego slajdu,można swobodnie dodawać zdjęcia.
		var imageLength = data.slider[nrSlider].position.length;
		//Sprawdzamy warunek brzegowy i wywołujemy funkcję
		if (pos > imageLength- 1) { pos=0; }
		//Obiekt obrazu, nr slajdu, pozycja w danym slajdzie
		fades($element,nrSlider,pos);
	}
	function prevSlide() {
		//Aktualna pozycja na ekranie
		var pos = $(this).siblings('img').attr('indexImage');
		//Pozycja poprzedniego zdjęcia.
		pos--;
		//Pobieramy index slajdu ,który się uakywnił.
		nrSlider = $(this).parent().attr('data-index');
		//Pobieramy obiekt obrazu,który właśnie się uaktywnił
		$element = $(this).siblings('img');
		// Pobieramy ilość zdjęć aktywnego slajdu,można swobodnie dodawać zdjęcia.
		var imageLength = data.slider[nrSlider].position.length;
		//Sprawdzamy warunek brzegowy i wywołujemy funkcję
		if (pos < 0) { pos = imageLength - 1; }
		//Obiekt obrazu, nr slajdu, pozycja w danym slajdzie
		fades($element,nrSlider,pos);
	}
	
//Aby uzyskać efekt 'przenikania' zdjęć,należy selektorowi img dla tej sekcji nadać pozycję absolutną, minusem jest to,że traci się
//responsywność zdjęcia, rozwiązaniem jest nadanie wysokości i szerokości dla różnych szerokości ekranu
	function fades($element,nrSlider,pos) {

		//Pobieramy odwołanie do starego obrazka
		var oldImage = $element;
		// Atrybuty nowego obrazu
		var imgPath = data.slider[nrSlider].position[pos].src;
		var imgTitle = data.slider[nrSlider].position[pos].title;
		var imgAlt = data.slider[nrSlider].position[pos].alt;
		
		//Tworzymy kod nowego obrazka
		var newImage = $('<img>',{
			src: imgPath,
			title: imgTitle,
			alt: imgAlt,
			indexImage: pos
		});
		//Obraz pojawi sie natychmiast jeśli go wstawimy,bez efektu.
		newImage.hide();
		// Dodajemy nowy obraz do modelu DOM
		$('.blog-sliders').eq(nrSlider).prepend(newImage);
		//Stopniowo wyświetlamy nowy obrazek.		
		newImage.fadeIn(700);
		//Stopniowo wygaszamy stary obrazek i usuwamy go z DOM.
		oldImage.fadeOut(700, function () {
			$(this).remove();
		});
	}
	
// Wywołanie funkcji

	setSlider();
	setImage();


//   Nasłuchiwanie zdarzeń 
	$('.next').click(nextSlide);
	$('.prev').click(prevSlide);
	
	
	
}); //ready





;jQuery(function ($) {
        //zresetowanie scrolla
        $.scrollTo(0);

        $('#js-about').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#about'), 1000);
        });
		$('#js-portfolio').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#portfolio'), 1000);
        });       
		$('#js-blog').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#blog'), 1000);
        });       
		$('#js-contact').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#contact'), 1000);
        });
        $('#js-pageTop').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#page-top'), 1200);
        });        
		$('#js-home').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#page-top'), 1200);
        });
        $('#js-pages').click(function (e) {
            e.preventDefault();
            $.scrollTo($('#pages'), 1000);
        }); 
  
	$('#js-menu-button').click(function () {
        $('.navigation-menu').toggle();
    });
	
    $(window).scroll(function () {
        if (window.scrollY < 50 && window.innerWidth > 778) {
            $('.navigation').css({'background': 'transparent'});
            return;
        }
        else {
            $('.navigation').css({'background': 'rgba(0,0,0,0.75)'});
        }
	   if($(this).scrollTop() > 600)   $('#js-pageTop').fadeIn(100);
	   else $('#js-pageTop').fadeOut(100);
    }); //scroll
 });//ready;;// javascript code 
	var bars = document.getElementsByClassName('js-percent-loading');
	var labels = document.getElementsByClassName('js-label');
//Procedury funkcji 
	function playAnimation() {
	var i = 0;
	var timer = setInterval(function () {
		if (i < bars.length) {
			bars[i].style.animationPlayState = "running";
			labels[i].style.animationPlayState = "running";
			i++;
		}
		else clearInterval(timer);
	}, 300);
}
	function startAnimate() {
	var distance = document.getElementById('js-skills').getBoundingClientRect().top;
	if (0 < distance && distance < 150) {
		playAnimation();
	}
}
// NASŁUCHIWANIE ZDARZEŃ 
	window.addEventListener('scroll', startAnimate, false);


