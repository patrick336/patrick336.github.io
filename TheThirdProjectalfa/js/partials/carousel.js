var slider = (function (){

	'use strict';

	// SLIDER CLASS
	// ================

	var Slider = function (pos,delay) {

		var self = this;
		var slider = document.querySelector('#js-carousel');
		var images  = slider.querySelectorsAll('.item');

		this.pos = pos || 0;
		this.delay = delay || 5000;
		this.indicators = createIndicatorsEvent();

		function createIndicatorsEvent () {

			var indicator = slider.getElementsByClassName('dot');

			for (var i=0,size = indicator.length; i<size;i++)
				indicator[i].addEventListener('click',function (evt) {
					self.getItemIndex(evt);
			},false);
		}

	}

	Slider.prototype =  {
		getItemIndex: function (evt) {
			this.pos =  evt.target.getAttribute('data-slide-to');
			return this.pos;
		}
	}

	Slider.prototype = {
		changeSlide: function (){

		}
	}

	document.addEventListener('DOMContentLoaded',function () {
		var slider1 = new Slider();

	},false);


}(slider));
