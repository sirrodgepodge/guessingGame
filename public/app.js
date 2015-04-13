var answer = Math.ceil(Math.random()*100).toString();

var fortyTwo = function(){
    $('#guessbox').attr("placeholder","42");
};

var hint = function(){
    $('#guessbox').attr("placeholder", answer);
};

var guessNum = 0;

var guess =  function(){
    var theirGuess = $('#guess').val();

    //add something flashing messages?
    
    //Create guess list if first, end game if guess number 5 and wrong
    if (theirGuess !== answer) {
	if (guessNum === 0) {
	    $('<ul class="guessList">Wrong Guesses:</ul>').appendTo(".main");
	}
	if (guessNum >= 5) {
	    console.log("You lost bro");
	    return;
	}
    }

    //Increment guess number
    guessNum += 1;
    
    if(theirGuess.length === 0 || typeof theirGuess !== "number") {
	console.log("Need a value!");
    } else if (theirGuess < answer) {
	$('<li class="hot">'+theirGuess+'</li>').appendTo(".guessList");
	console.log("too low");
    } else if (theirGuess > answer) {
	$('<li class="cold">'+theirGuess+'</li>').appendTo(".guessList");
	console.log("too high");
    } else {
	console.log("You got it!!!!!");
    }
};

var main= function(){
    $('#fortytwo').click(fortyTwo);
    $('#hint').click(hint);
    $('#guess').click(guess);
}

$(document).ready(main);
