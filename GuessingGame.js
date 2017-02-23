function generateWinningNumber(){
    return Math.floor(Math.random()*100)+1;
};

function shuffle(array){
var currentElm, n = array.length, i;
while(n){
    i = Math.floor(Math.random()* n--);
    currentElm = array[n];
    array[n] = array[i];
    array[i] = currentElm;
}
return array;
}

function Game(){
    var playersGuess, pastGuesses;
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.winningNumber - this.playersGuess);
}
Game.prototype.isLower = function(){
    if(this.winningNumber > this.playersGuess){
        return true;
    } else {
        return false;
    }
}

Game.prototype.playersGuessSubmission = function(num){
    if(num < 1 || num > 100 || typeof(num) !== 'number' ||typeof(num) === 'string'){
        $('#title').text("That is an invalid guess!");
        throw "That is an invalid guess."
    } else {
        this.playersGuess = num;
    }

     return this.checkGuess();
}

Game.prototype.checkGuess = function(){
    if(this.pastGuesses.includes(this.playersGuess) === false){
        this.pastGuesses.push(this.playersGuess)
        $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
    } else {
        return "You have already guessed that number."
    }
    if(this.pastGuesses.length === 5){
        if(this.playersGuess === this.winningNumber){
            $('#hintButton, #buttonGo').prop("disabled",true);
            $('#subtitle').text("Press the Reset button to play again!")
            return "You Win!";
        }
        else {
            $('#hintButton, #buttonGo').prop("disabled",true);
            $('#subtitle').text("Press the Reset button to play again!")
            return "You Lose."
        }
    } else {
        if(this.playersGuess === this.winningNumber){
            $('#hintButton, #buttonGo').prop("disabled",true);
            $('#subtitle').text("Press the Reset button to play again!")
            return "You Win!";
        } else if(this.difference() < 10) {
            return "You're burning up!"
        } else if(this.difference() < 25){
            return "You're lukewarm.";
        } else if(this.difference() < 50){
            return "You're a bit chilly."
        } else if(this.difference() < 100){
            return "You're ice cold!"
        }
    }
}

function newGame(){
    return new Game();
};

Game.prototype.provideHint = function(){
    var hint = [this.winningNumber];
    hint.push(generateWinningNumber())
    hint.push(generateWinningNumber())
    shuffle(hint);
    return hint;
}

function makeAguess(game){
    var guess = $('#box').val();
    var output = game.playersGuessSubmission(parseInt(guess))
    $('#title').text(output);
}

$(document).ready(function(){
    var game = new Game();
    $('#buttonGo').click(function(){
        makeAguess(game);
    })

    $('#box').keypress(function(event){
        if(event.which == 13){
            makeAguess(game);
        }
    })

    $('#resetButton').click(function(){
        game = new Game();
        $('#title').text("Play the Guessing Game");
        $('#subtitle').text("Guess a number between 1 - 100!");
        $('.guess').text("-");
        $('#hintButton, #buttonGo').prop("disabled",false);
    });

   $('#hintButton').click(function(){
       var hints = game.provideHint();
       $("#title").text(`Your winning number is ${hints[0]}, ${hints[1]}, or ${hints[2]}`)
   });
});



