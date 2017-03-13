//////////////////  ZMIENNE GLOBALNE /////////////////////

//Opis rozgrywki
var introduction = document.getElementById('introduction');

//Kontener przycisku nowej gry
var newGameElem = document.getElementById('js-newGameElement');
   
// Tabela trzymająca dane, wybory graczy oraz wynik.
var resultsElem = document.getElementById('js-resultsTableElement');

//Nick gracza oraz wynik bieżącej rozgrywki.
var playerNameElem = document.getElementById('js-playerName'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    computerPointsElem = document.getElementById('js-computerPoints');

//Kontener oraz poszczególne przyciski do gry.
var pickElem = document.getElementById('js-playerPickElement'),
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

//Wybory graczy.
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick');
    
// Sygnalizacja zwycięstwa danej rundy.    
var playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

// Sygnalizacja remisu    
var scoreless = document.getElementById('js-scoreless');

// Ogłoszenie zwycięstwa całej rozgrywki.
var resultGame = document.getElementById('resultGame');
// Zmienne okna modalnego.
var modalWindow = document.getElementById('modalWindow');
var btnNewGame = document.getElementById('js-startGame');

// Zmienne formularza.
var form = document.getElementById('submit-form'),
    btnSubmit = document.getElementById('js-loadGame'),
    message = document.getElementById('message');


// Wartości początkowe.
var gameState = 'notStarted'; 
var player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };


//////////////// PROCEDURY FUNKCJI ////////////////////////


setGameElements();

//Kontrola widoku zależnie od etapu gry.
function setGameElements() {
  switch(gameState) {
    case 'started':
        introduction.style.display = 'none';
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        resultGame.style.display = 'none';  
      break;
    case 'ended':
        btnNewGame.innerHTML = 'Jeszcze raz';
        resultGame.style.display = 'block';  
    case 'notStarted':
    default:
//        introduction.style.display = 'block';
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

// Wyświetlanie ruchu graczy w formie ikony.
function showPick (movement) {
    
    var iconMove = ['<i class="fa fa-hand-rock-o" aria-hidden="true"></i>',
                    '<i class="fa fa-hand-paper-o" aria-hidden="true"></i>',
                    '<i class="fa fa-hand-scissors-o" aria-hidden="true"></i>'];
    
        
        
    switch (movement){
        case 'rock':
            return iconMove[0];
            break;
        case 'paper':
            return iconMove[1];
            break;
        case 'scissors':
            return iconMove[2];
            break;
        default: console.log('Coś poszło nie tak');
            
            
    }
}

// Wygenerowanie wyboru komputera
function getComputerPick () {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks [Math.floor(Math.random()*3)];
}


// 1) Funkcja przyjmuje jeden parametr,tym parametrem jest wybór gracza 
//    poprzez kliknięcie
// 2) Zmienna computerPick trzyma aktualny wybór komputera.
// 3) Pokazanie wyborów na ekran
// 4) Wywołanie funkcji odpowiedzialnej za sprawdzenie rundy
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = showPick(playerPick);
    computerPickElem.innerHTML = showPick(computerPick);
    
    checkRoundWinner(playerPick, computerPick);
}

//Sprawdzanie rundy.
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = scoreless.innerHTML='';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    } else scoreless.innerHTML = "Remis";
    
    setGamePoints();
    whoWins();
}

//AKTUALIZACJA WYNIKU NA EKRANIE.
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

// POKAZYWANIE OKNA MODALNEGO I JEGO OBSŁUGA.
function showForm() {

    var span = document.getElementById('close');
    modalWindow.style.display = 'block';
    span.onclick = function () {
        modalWindow.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modalWindow) {
            modalWindow.style.display = 'none';
        }
    }
    window.onkeydown = function (event){
        if (event.keyCode == 27) 
    // Naciśnięcie ESC zamyka okno       
            modalWindow.style.display = 'none';
    }
}



//Sprawdzanie ostatecznego wyniku 
//i wyprowadzenie na ekran informacji o zwycięstwie.
function whoWins () {
    
    if(player.score == 10) {
        gameState = 'ended';
        setGameElements();
        resultGame.innerHTML = "Wygrał: " + player.name + ". Gratulacje !";
    }
    else if(computer.score == 10) {
        gameState = 'ended';
        setGameElements();
        resultGame.innerHTML = "Wygrał komputer. Gramy rewanż?";
    }
    
      
}

//Resetowanie wartości przed rozgrywką.
function resetValues () {
    playerPickElem.innerHTML="";
    computerPickElem.innerHTML="";
    playerResultElem.innerHTML="";
    computerResultElem.innerHTML="";    
    player.score = computer.score = 0;
    player.name = "";
    gameState ='started';
}

//////////////// NASŁUCHIWANIE ZDARZEŃ ////////////////////////


// Walidacja danych.
form.addEventListener('submit', function (event) {
    
    resetValues();
    
    var login = document.getElementById('login').value;
    var expression = /^[a-zA-Z0-9]{6,12}$/;
    if (login.match(expression)) {
        message.style.display = "none"; //chowamy komunikat jeśli użytkownik wprowadził poprawną wartość
        player.name = login; 
        setGameElements();
        playerNameElem.innerHTML = login;
        setGamePoints();
        modalWindow.style.display = 'none';        
    }
    else {
//        e.preventDefault();
        message.style.display = "block";
    }
   event.preventDefault();
});

//Przycisk nowej gry i pokazanie okna. 
btnNewGame.addEventListener('click', showForm, false);

//Usuwanie komunikatu.
document.getElementById('reset').addEventListener('click', function () {
    message.style.display = "none";
});

// NASŁUCHIWANIE WYBORU GRACZA, FUNKCJA DAJE INFORMACJE CO GRACZ WYBRAŁ
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });