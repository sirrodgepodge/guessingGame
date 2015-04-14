var answer = Math.ceil(Math.random()*100);
var origBackground = $('body').css('background');
var origPlaceholder = $('#guessBox').attr('placeholder');

var fortyTwo = function(){
    $('#guessBox').attr("placeholder","42");
    $('#guessBox').val("");
};

var hint = function(){
    $('#guessBox').attr("placeholder", answer);
    $('#guessBox').val("");
};

var guessRem = 5;
var guess = function() {
    var theirGuess = parseInt($('#guessBox').val());
    $('#guessBox').val("");
    
    //Check guess type
    if(theirGuess.toString() === 'NaN' && guessRem > 0 || theirGuess > 100 || theirGuess < 1) {
	$('#guessBox').attr("placeholder", "Number 1-100 Please!");
	return;
    }

    //Increment guess number
    guessRem -= 1;
    $('#guessBox').attr("placeholder", guessRem + " guesses left!");

    //clicking "play again"
    if(guessRem === -1) {
	playAgain();
	return;
    }

    //Create guess list if first, end game if guess number 5 and wrong
    if (theirGuess !== answer && guessRem === 0) {
	$('#guessBox').attr("placeholder", "Work on that guess!");
	$("h4.guessFBack").text("You've lost :(").css('color','red');
	$('#guess').text("Play Again!");
	$('body').attr('background', 'red');
	$('#guess').attr('id','playAgain');
	return;
    }

    //Provide guess feedback
    if (theirGuess < answer) {
	$('<li class="below">'+theirGuess+'</li>').appendTo("ul.guessFBack");
	$('h4.guessFBack').css('color', 'blue').text("Too Low!");
    } else if (theirGuess > answer) {
	$('<li class="above">'+theirGuess+'</li>').appendTo("ul.guessFBack");
	$('h4.guessFBack').css('color', 'red').text("Too High!");
    } else {
	//for right answer
	$('#guessBox').attr('placeholder', 'killer guessing!');
	$('h4.guessFBack').css('color', 'green').text("You Win!!! :)");
	$('#guess').text("Play Again!");
	$('body').css('background', 'green');
	guessRem = 0;
    }
};

var playAgain = function() {
    answer = Math.ceil(Math.random()*100);
    guessRem = 5;
    $('.guessFBack li').remove();
    $('h4.guessFBack').text("");
    $('#guessBox').attr('placeholder', origPlaceholder);
    $('body').css('background', origBackground);
    $('#guess').text("Guess!");
};

var main= function(){
    $('#fortytwo').click(fortyTwo);
    $('#hint').click(hint);
    $('#guess').click(guess);
    $('#playAgain').click(playAgain);
    $('#guessBox').keyup(function(e){
	if(e.which==13){
	    $('#guess').click();
	}
    });
}

$(document).ready(main);
