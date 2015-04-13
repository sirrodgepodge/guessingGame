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
    if(theirGuess.toString() === 'NaN' || theirGuess > 100 || theirGuess < 1) {
	$('#guessBox').attr("placeholder", "Number 1-100 Please!");
	return;
    }
    
    //Create guess list if first, end game if guess number 5 and wrong
    if (theirGuess !== answer && guessRem === 1) {
	$('#guessBox').attr("placeholder", "Work on that guess!");
	$("h4.guessFBack").text("You've lost :(").css('color','red');
	$('#guess').text("Play Again!");
	$('body').attr('background', '#FF0000');
	$('#guess').attr('id','playAgain');
	main();
	return;
    }

    //Increment guess number
    guessRem -= 1;
    $('#guessBox').attr("placeholder", guessRem + " guesses left!");

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
	$('#guess').attr('id', 'playAgain');
	$('body').css('background', '#00CC00');
	main();
    }
};

var playAgain = function() {
    answer = Math.ceil(Math.random()*100);
    guessRem = 5;
    $('.guessFBack li').remove();
    $('h4.guessFBack').text("");
    $('#guessBox').attr('placeholder', origPlaceholder);
    $('body').css('background', origBackground);
    $('#playAgain').text("Guess!").attr('id','guess');
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
