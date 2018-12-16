$(function () {

	$('#js-translate').on('click', 'span',function() {
		


		var lang = $(this).attr('lang-choice');
		var fileJSON ='./multilanguage/' + lang + '.json';

		if(lang == 'pl') {

			$('#js-lang-skill-text').load('./multilanguage/pl-skill-text.html');
			$('#js-lang-about-text').load('./multilanguage/pl-about-text.html');

		} else if (lang == 'en' ) {

			$('#js-lang-skill-text').load('./multilanguage/en-skill-text.html');
			$('#js-lang-about-text').load('./multilanguage/en-about-text.html');
		}
			

		$.getJSON(fileJSON,function(resp){

			$('[data-lang]').each(function(index,value){
				var item = $(this).data('lang');
				 $(this).text(resp[item]);
			});

		}); // End REQ JSON
	}); // End CLICK
}); // End ready
































//	function getData (){
//		
//			$.getJSON(fileJSON,function(resp){
//			
//			translation.each(function(index,value){
//				var item = $(this).data('lang');
//				$(value).text(resp[item]);
//			});
//		});
//	}

//	
//	function setLanguage (language) {
//				
//		 switch(language) {
//     		case "pl":
//         		$('html').attr("lang",language);
//				translateToPolish(); 
//         		break;
//    		
//     		case "en":
//				$('html').attr("lang",language);
//         		translateToEnglish();
//				 break;
//    	
//     	default:
//  			$('html').attr("lang","pl");
//		    translateToPolish();
//		 }
//		
//	}
//	
//	function translateToPolish () {
//			$('#js-lang-skill-text').load('multilanguage/pl-skill-text.html');
//			$('#js-lang-about-text').load('multilanguage/pl-about-text.html');
//	}	
//	function translateToEnglish () {
//			$('#js-lang-skill-text').load('multilanguage/en-skill-text.html');
//			$('#js-lang-about-text').load('multilanguage/en-about-text.html');
//	}
