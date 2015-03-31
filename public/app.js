var blah = Math.ceil(Math.random()*100).toString();

var fortyTwo = function(){
    $('#guessbox').attr("placeholder","42");
}

var hint = function(){
    $('#guessbox').attr("placeholder",blah);
}

var main= function(){
    $('#fortytwo').click(fortyTwo);
    $('#hint').click(hint);
}

$(document).ready(main);