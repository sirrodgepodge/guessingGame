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
var guessArr = [];
var guess = function() {
    var theirGuess = parseInt($('#guessBox').val());
    $('#guessBox').val("");
    
    //Check guess type
    if((theirGuess.toString() === 'NaN' || theirGuess > 100 || theirGuess < 1) && guessRem > 0) {
	$('#guessBox').attr("placeholder", "Number 1-100 Please!");
	return;
    } else if (guessArr.indexOf(theirGuess)!==-1){
	$('#guessBox').attr("placeholder", "Already guessed!");
	return;
    } else {
	guessArr.push(theirGuess);
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
	temp = "Roasting";
	$("h4.guessFBack").text("You've lost :(").addClass(temp);
	$('#guess').text("Play Again!");
	$('body').css('background', 'red');
	guessArr = [];
	return;
    }

    ////Provide guess feedback
    //provide temperature first
    if(temp) $('h4.guessFBack').removeClass(temp);
    var temp = Math.abs(theirGuess-answer);
    if(temp === answer){
	temp = "won"
    } else if (temp > 40){
	temp = "Freezing";
    } else if (temp > 25) {
	temp = "Cold";
    } else if (temp > 10) {
	temp = "Hot";
    } else {
	temp = "Roasting";
    }

    if(theirGuess < answer) {
	$('<li class="'+temp+'">'+theirGuess+'&#8593;</li>').appendTo("ul.guessFBack");
	$('h4.guessFBack').addClass(temp).text(temp+"! Too Low!");
    } else if (theirGuess > answer) {
	$('<li class="'+temp+'">'+theirGuess+'&#8595;</li>').appendTo("ul.guessFBack");
	$('h4.guessFBack').addClass(temp).text(temp+"! Too High!");
    } else {
	//for right answer
	$('#guessBox').attr('placeholder', 'killer guessing!');
	$('h4.guessFBack').addClass(temp).text("You Win!!! :)");
	$('#guess').text("Play Again!");
	$('body').css('background', '#00CC00');
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
