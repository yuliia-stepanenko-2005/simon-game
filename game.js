let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; // randomChosenColour
let userClickedPattern = []; //value attr

let btn = $('.btn'); //from me
let levelId = $('#level-title'); //from me

let level = 0;
let started = false;

btn.on('click', function() {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    console.log(userChosenColour);
    checkAnswer(userClickedPattern.length-1); // because index starting from 0 записується індекс а не довжина
    console.log(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
});

$(document).on("keydown", function (e) {
    if(e.key.toLowerCase() === 'a'){ // from me
        if(!started){
            levelId.text('Level' + level);
            nextSequence();
            started=true;
        }
    } else {
        console.log('no');
    }
});

function nextSequence() {
    userClickedPattern =[];
    levelId.text('Level ' + ++level);
    let number = [0, 1, 2, 3]; //from me
    let randomNumber = Math.floor(Math.random() * number.length); // or multiply on 4. from 0 to 3
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut('slow').fadeIn('fast').fadeOut('fast').fadeIn('slow');
    playSound(randomChosenColour);

    return { randomNumber, randomChosenColour };
}

function playSound(name) {
    let audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    let pressed = $('#' + currentColour);
    pressed.addClass('pressed');
    setTimeout(function() {
        pressed.removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('Success');
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else{
        console.log('Wrong');

        let wrong = new Audio('./sounds/wrong.mp3');
        wrong.play();

        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
            levelId.text('Game Over, Press Any Key to Restart');
        }, 200);

        startOver();
    }
}
console.log(gamePattern);
console.log(userClickedPattern);

function startOver(){
    level = 0;
    started = 0;
    gamePattern = [];
    $(document).on("keydown", function () { //from me?
        if(!started){
                levelId.text('Level' + level);
                nextSequence();
                started=true;
        }
    });
}