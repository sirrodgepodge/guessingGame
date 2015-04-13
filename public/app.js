var answer = Math.ceil(Math.random()*100);
var origBackground = $('body').css('background');

var fortyTwo = function(){
    $('#guessbox').attr("placeholder","42");
};

var hint = function(){
    $('#guessbox').attr("placeholder", answer);
};

var guessRem = 5;
var guess =  function() {
    var theirGuess = $('#guess').val();
    $('#guess').val() = "";
    
    //Check guess type
    if(theirGuess.length === 0 || typeof theirGuess !== 'number') {
	$('#guessbox').attr("placeholder", "Number Please!");
	return;
    }
    
    //Create guess list if first, end game if guess number 5 and wrong
    if (theirGuess !== answer && guessRem === 1) {
	console.log("You lost bro");
	return;
    }

    //Increment guess number
    guessRem -= 1;
    $('#guessbox').attr("placeholder", guessRem + " guesses left!");

    //Provide guess feedback
    if (theirGuess < answer) {
	$('<li class="below">'+theirGuess+'</li>').appendTo(".guessList");
	$('#guessFBack').css('color', 'blue').text("Too Low!");
    } else if (theirGuess > answer) {
	$('<li class="above">'+theirGuess+'</li>').appendTo(".guessList");
	$('#guessFBack').css('color', 'red').text("Too High!");
    } else {
	console.log("You got it!!!!!");	
	$('#guess').text("Play Again!");
	$('#guess').attr('id', 'playAgain');
    }
};

var playAgain = function() {
    answer = Math.ceil(Math.random()*100);
    guessRem = 5;
    $('#guessFBack').text("");
    $('body').css('background', origBackground);
    $('#playAgain').attr('id','guess');
};

var main= function(){
    $('#fortytwo').click(fortyTwo);
    $('#hint').click(hint);
    $('#guess').click(guess);
    $('#playAgain').click(playAgain);
}

$(document).ready(main);
