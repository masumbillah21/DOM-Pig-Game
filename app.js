var scores, roundScore, activePlayer, gamePlaying;

init ();


var x = document.querySelector('#score-' + activePlayer).textContent;


//btn roll click
document.querySelector('.btn-roll').addEventListener('click', function(){
	
	if(gamePlaying){
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6 ) + 1;
		var dice2 = Math.floor(Math.random() * 6 ) + 1;


		// 2. Display Result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';	
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';	

		// 3. Udpate the round score if the rolled number was not a 1;

		if(dice1 !== 1 && dice2 !== 1){
			//add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}else{
			nextPlayer();
		}


	}
});

//btn hold click
document.querySelector('.btn-hold').addEventListener('click', function(){
	
	if(roundScore !== 0){
		// 1. add current score to Global score

		scores[activePlayer] += roundScore;

		// 2. update the UI

		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// 3. check if player won the game

		var input = document.querySelector('.final-score').value;
		var winningScore;
		if(input){
			winningScore = input;
		}else{
			winningScore = 100;
		}

		if(scores[activePlayer] >= winningScore){
			gamePlaying = false;
			roundScore = 0;
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';		
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('#current-' + activePlayer).textContent = '0';
		}else{
			// Next player
			nextPlayer();
		}

	}

});


function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init (){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}