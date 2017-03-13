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
}); //ready