var gamePattern=[];
var userClickedPattern =[];
var buttonColours = ["red", "blue","green","yellow"];


var started = false;

var level = 0;
function makeSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function startOver(){
  started = false;
  level =0;
  gamePattern = [];
}

$(document).keydown(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    setTimeout(function(){
      nextSequence();
    },500);
    started = true;
  }
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")},200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(4*Math.random());
  var randomChosenColour =buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColour);
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(
  function()
  {
     $("#"+currentColour).removeClass("pressed");
  }, 100);


}

  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    // console.log(gamePattern);
    console.log(userClickedPattern);
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  });
