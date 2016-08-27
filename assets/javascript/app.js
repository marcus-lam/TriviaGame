var questionsArr = ["Who won the world championship a record 9 times in a row, making him the most successful rally driver in WRC's history?", "Which professional rally driver is best known for his stunt driving and 'Gymkhana' videos?", "Which racing driver popularized drifting and is known around the world as the 'Drift King'?", "Which Formula One driver (with Mercedes AMG Petronas) has dominated the series for the past 3 years?", "Which racing driver was voted the greatest Formula 1 driver of all time by a unique poll of 217 of his fellow world championship drivers?", "Which driver suffered a fatal crash at Imola in 1994, tragically marking him as the last death of a F1 driver until 2015?"];
var choicesArr = [["Sébastien Loeb", "Tommi Mäkinen", "Walter Röhrl", "Colin McRae"], ["Travis Pastrana", "Sébastien Loeb", "Ken Block", "Colin McRae"], ["Ken Block", "Keiichi Tsuchiya", "Bunta Fujiwara", "Takumi Fujiwara"], ["Michael Schumacher", "Sebastian Vettel", "Nico Rosberg", "Lewis Hamilton"], ["Ayrton Senna", "Alain Prost", "Juan Manuel Fangio", "Michael Schumacher"], ["Gilles Villeneuve", "Riccardo Paletti", "Roland Ratzenberger", "Ayrton Senna"]];
var imagesArr = ["<img class='rightImg' src='assets/images/loeb.gif'>", "<img class='rightImg' src='assets/images/block.gif'>", "<img class='rightImg' src='assets/images/dk.gif'>", "<img class='rightImg' src='assets/images/hamilton.gif'>", "<img class='rightImg' src='assets/images/senna.gif'>", "<img class='rightImg' src='assets/images/sennaCrash.gif'>"];
var answersArr = ["A. Sébastien Loeb", "C. Ken Block", "B. Keiichi Tsuchiya", "D. Lewis Hamilton", "A. Ayrton Senna", "D. Ayrton Senna"];
var timeCounter = 30;
var questionCounter = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var clock;

var zoom = new Audio("assets/sounds/zoom.mp3");
var startUp = new Audio("assets/sounds/startUp.mp3");
var rev = new Audio("assets/sounds/rev.mp3");
var bgTick = new Audio("assets/sounds/bgTick.mp3");


$(document).ready(function() {

	function startingScreen() {
		start = "<header>Auto Racing Trivia Game</header> + <button id='start-button'>Start!</button>";
		$("#mainBox").html(start);
		zoom.play();
	};

	function genHTML() {
		gHTML = "<div id='questionBox'><p id='question'>"+questionsArr[questionCounter]+"</p><p id='timeReText'>Time Remaining: <span id='timer'>"+timeCounter+"</span> Seconds</p></div><div id='choiceBox'><button id='choiceOne' class='cButtons'>A. "+choicesArr[questionCounter][0]+"</button><button id='choiceTwo' class='cButtons'>B. "+choicesArr[questionCounter][1]+"</button><button id='choiceThree' class='cButtons'>C. "+choicesArr[questionCounter][2]+"</button><button id='choiceFour' class='cButtons'>D. "+choicesArr[questionCounter][3]+"</button></div>";
		$("#mainBox").html(gHTML);
	};

	function endingScreen() {
		clearInterval(bg);
		end = "<div id='questionBox'><p class='gameMsg'>You've finished! Here's how you did:</p><p class='summary'>Correct Answers: "+correct+"<br>Wrong Answers: "+incorrect+"<br>Unanswered: "+unanswered+"</p><button id='reset-button'>Reset The Game!</button><iframe width='450' height='255' src='https://www.youtube.com/embed/auwyb8GQYwM?autoplay=1' frameborder='0' allowfullscreen></iframe></div>";
		$("#mainBox").html(end);
	};

	function tickTock() {
		clock = setInterval(countdown, 1000);
		function countdown() {
			if (timeCounter > 0) {
				timeCounter --;
			}
			if (timeCounter === 0) {
				clearInterval(clock);
				genLossTimesUp();
			}
			$("#timer").html(timeCounter);
		};
	};

	function transition() {
		if (questionCounter < 5) {
			questionCounter++;
			timeCounter = 30;
			genHTML();
			tickTock();
		} else {
			endingScreen();
		}
	};

	function genLossTimesUp() {
		unanswered++;
		gHTML = "<div id='questionBox'><p id='timeReText'>Time Remaining: <span id='timer'>"+timeCounter+"</span> Seconds</p><p class='gameMsg'>Time's up... The correct answer was: "+answersArr[questionCounter]+".</p><img class='wrongImg' src='assets/images/wrong.gif'></div>";
		$("#mainBox").html(gHTML);
		setTimeout(transition, 5000);
	};

	function genLoss() {
		incorrect++;
		gHTML = "<div id='questionBox'><p id='timeReText'>Incorrect!</p><p class='gameMsg'>The correct answer was: "+answersArr[questionCounter]+".</p><img class='wrongImg' src='assets/images/wrong.gif'></div>";
		$("#mainBox").html(gHTML);
		setTimeout(transition, 5000);
	};

	function genWin() {
		correct++;
		gHTML = "<div id='questionBox'><p id='timeReText'>Correct!</p><p class='gameMsg'>The answer was: "+answersArr[questionCounter]+".</p>"+imagesArr[questionCounter]+"</div>";
		$("#mainBox").html(gHTML);
		setTimeout(transition, 5000);
	};

	function reset() {
		timeCounter = 30;
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		setTimeout(genHTML, 1000);
		tickTock();
	};

	startingScreen();

	$("#start-button").click(function() {
		zoom.pause();
		startUp.play();
		setTimeout(genHTML, 1000);
		bg = setInterval(function(){ bgTick.play(); }, 2000);
		tickTock();
	});

	$("#mainBox").on("click", "#reset-button", function() {
		startUp.play();
		reset();
		bg = setInterval(function(){ bgTick.play(); }, 2000);
	});

	$("#mainBox").on("click", ".cButtons", function() {
		rev.play();
		currentChoice = $(this).text();
		if (currentChoice === answersArr[questionCounter]) {
			clearInterval(clock);
			genWin();
		} else {
			clearInterval(clock);
			genLoss();
		}
	});

});