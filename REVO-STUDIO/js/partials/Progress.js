// javascript code 
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


