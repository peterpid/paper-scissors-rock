var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() {
    playerPick('rock'); 
});

pickPaper.addEventListener('click', function() {
	playerPick('paper'); 
});

pickScissors.addEventListener('click', function() {
	playerPick('scissors'); 
});

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

//const MAX_POINTS = 10;
var MAX_POINTS = 10;

function setGameElements() {
  	switch(gameState) {
	    case 'started':
		    newGameElem.style.display = 'none';
		    pickElem.style.display = 'block';
		    resultsElem.style.display = 'block';
	      	break;
	    case 'ended':
	        newGameBtn.innerText = 'Play again';
	        newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsElem.style.display = 'none';
	        break;
	    case 'notStarted':
	    	newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsElem.style.display = 'none';
	        break;
	    default:
	        newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsElem.style.display = 'none';
  	}
}

function newGame() {
  	player.name = prompt('Please enter your name', 'player name');
  	if (player.name) {
	    player.score = computer.score = 0;
	    gameState = 'started';
	    setGameElements();

	    playerNameElem.innerHTML = player.name;
	    setGamePoints();
  	}
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    checkGameState();
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
  	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  	var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // draw
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function isGameFinished() {
	return (player.score >= MAX_POINTS || computer.score >= MAX_POINTS);
}

function getWinner() {
	if (player.score >= MAX_POINTS) {
		return player.name;
	} else if (computer.score >= MAX_POINTS) {
		return 'Computer';
	} else {
		return 'No winner';
	}
}

function checkGameState() {
	if (isGameFinished()) {
		gameState = 'ended';
		setTimeout(function() { 
			alert("The winner is: " + getWinner());
			setGameElements();
		}, 100); //TODO: how to get rid of this 100ms delay. Without this alert is displayed before max score is displayed?
	}
}

setGameElements();