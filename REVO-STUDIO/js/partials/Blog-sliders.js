
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
	
	// Pokazywanie opisu - mają być widocznie wyłącznie gdy zdjęcia zostaną wczytane.
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
		//Obraz pojawi sie natychmiast,bez efektu.
		newImage.hide();
		// Dodajemy nowy obraz do modelu DOM
		$('.blog-sliders').eq(nrSlider).prepend(newImage);
		//Stopniowo wyświetlamy nowy obrazek.
		newImage.fadeIn(800);
		//Stopniowo wygaszamy stary obrazek i usuwamy go z DOM.
		oldImage.fadeOut(800, function () {
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
