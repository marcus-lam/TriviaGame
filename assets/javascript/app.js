var questionsArr = [];
var choicesArr = [];
var imagesArr = [];
var answersArr = [];

var zoom = new Audio("assets/sounds/zoom.mp3");
var startUp = new Audio("assets/sounds/startUp.mp3");
var rev = new Audio("assets/sounds/rev.mp3");

zoom.play();
$("#start-button").click(function(){
	zoom.pause();
	startUp.play();
	$("header").remove();
	$("#start-button").remove();
});
//rev.play();