	//Pure JavaScript practise
	//Buttons
	var btnAssign = document.querySelector("#js-category");
	var btnCategory = btnAssign.querySelectorAll("button"); // getElementsByName equivalent

	var gallery = document.getElementById('gallery');
	var project = gallery.querySelectorAll('.portfolio-item');
	var cover = gallery.querySelectorAll('.portfolio-cover');



	// usuwa klasę active ze wszystkich przycisków
	function removeActiveState() {

		var nameClass = /(?:^|\s)active(?!\S)/g;

		for (var i = 0 , size = btnCategory.length ; i < size ; i++ ) {
			btnCategory[i].className = btnCategory[i].className.replace(nameClass,'');
		}
	}
	// Ustawianie kategorii + animacja
	function setCategory (category) {

		var test="";
		category = category.toUpperCase();


		for(var i = 0, size = project.length; i < size; i++) {

			test = project[i].getAttribute("category");
			test = test.toUpperCase();

			if(category == test || category == 'ALL') {

				project[i].className = project[i].className.replace( /(?:^|\s)fade(?!\S)/g , '' );
				cover[i].style.display = 'block';
			 }
			 else {

				project[i].className += ' fade';
				cover[i].style.display = 'none';
			 }
		}
	}
	// Przypisanie przyciskom kategorii
	function setCategoriesBtn () {

		var categories = ['All','Photography','WebDesign','WebDevelopment','Graphic'];

		categories.map(function(item, index) {
			btnCategory[index].setAttribute('category',item);
		});

	}

	function setAllButtonsEventClick() {
		for (var i = 0, size = btnCategory.length; i < size; i++) {
			btnCategory[i].addEventListener('click', function (evt) {
				removeActiveState();
				this.className += ' active';
				setCategory(evt.target.getAttribute('category'));
			});
		}
	}

	// Nasłuchiwanie zdarzeń
	window.addEventListener('load',setCategoriesBtn,false);
	window.addEventListener('load',setAllButtonsEventClick,false);



