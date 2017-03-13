
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

