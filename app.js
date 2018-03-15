/*
This two functions below are used 
to manipulate CSS to show or hide card
*/
function showCard(x) {
	x.style.transform="rotateY(0deg)";
}

function hideCard(x) {
	x.style.transform="rotateY(90deg)";
}

/*
The function below shows shape of card back
and adds the revealing mechanics
*/
function turnCard() {
	if (flag == true) { // only if flag == true, carry on
	    const card = this.children[0]; // assign children element of clicked div to variable
	    showCard(card); // change style of transform to show the shape
	    cardsArray.push(card); // and push it "cardsArray" 
	    this.removeEventListener("click", turnCard); // remove event listener to prevent next clicks
	    moves++; // count clicks
	    if (moves == 1) timer(); // turn on the stopwatch when first card was clicked
	    if (cardsArray.length == 2) { // if 2 cards were clicked
	    	
	    	changeStars(); // check function conditions
	    	moves_info.innerHTML = moves/2; // move occur when 2 cards were clicked
	    	flag = false; // change flag to false to prevent next clicks on whole game board until animation end
	    	setTimeout(checkReversals, 300); // call next function with delay 300ms, also this is the time in which the cards are exposed after second click
	    }
	}
}

/*
The function below checks if two
consecutive clicks show the same shape
*/
function checkReversals() {
	if (cardsArray[0].className == cardsArray[1].className) { // if card backs were the same:
		cardsArray = []; // clear array
		points++; // add 1 point
		if (points == 1) { // if points == 8 you won ;)
			toggleModal();
			timerStop();

		}	
	}
	else { // if card back weren't the same:
		hideCard(cardsArray[0]) // hide cards
		hideCard(cardsArray[1])
		
		/*
		add event listeners again, because it 
		were removed while click event occured	
		*/
		cardsArray[0].parentElement.addEventListener("click", turnCard);
		cardsArray[1].parentElement.addEventListener("click", turnCard);
		cardsArray = [];
	}
	flag = true; // set flag to true, so that you can continue use "turnCard" function
}

/*
this function change the icon depending 
on the numbers of moves
*/
function changeStars() {
	if (moves == 12*2) {
		stars[2].className = "icon-star-half-alt";
	}
	else if (moves == 15*2) {
		stars[2].className = "icon-star-empty";
	}
	else if (moves == 18*2) {
		stars[1].className = "icon-star-half-alt";
	}
	else if (moves == 21*2) {
		stars[1].className = "icon-star-empty";
	}
	else if (moves == 24*2) {
		stars[0].className = "icon-star-half-alt";
	}
	else if (moves == 27*2) {
		stars[0].className = "icon-star-empty";
	}
}

/*
Function shuffle cards in random order
Take each of the element with class "card__back"
Splice method remove and return one class from classes array
and add it to first element with class "card__back", and so on...
*/
function shuffle() {
	// Create an array of classes with shapes
	let classes = ["icon-heart", "icon-camera", "icon-ambulance", "icon-thumbs-up-alt", "icon-paper-plane", "icon-binoculars", "icon-plug", "icon-user-secret", 
	"icon-heart", "icon-camera", "icon-ambulance", "icon-thumbs-up-alt", "icon-paper-plane", "icon-binoculars", "icon-plug", "icon-user-secret"];

	card_backs.forEach(function(cb) {
		cb.classList.add(classes.splice(Math.floor( (Math.random()*classes.length)), 1 ));
	});
}

/*
This function reset whole game board
without refreshing page
*/
function restartGame() {
	// reset classes 
	card_backs.forEach(function(cb) {
		cb.className = ""; // clear class of an element
		cb.classList.add("card__back"); // bring back "card__back" class
		cb.style.transform="rotateY(90deg)"; // hide card
	});
	setTimeout(shuffle, 200); // setTimeout function prevents from seeing new shuffled cars for 0.2s (as much as set transition time)
	addListeners(); // add listeneres again
	moves = 0; // reset moves
	points = 0; // reset points
	moves_info.innerHTML = moves; // change moves to actual value
	timerStop(); // stop timer
	stars.forEach(function(element) { // this loop reset stars
		element.className = "icon-star";
	});
	seconds = 0; // reset seconds
	time.innerHTML = seconds;
}

/*
Code below assign all html elements with class 
"card" to cards variable, then add 
Event Listener to each of them
*/
function addListeners() {
	const cards = document.querySelectorAll(".card");
	cards.forEach(function(card) {
		card.addEventListener("click", turnCard);
	});
}

/*
Code below handle showing modal when game finish
*/
function toggleModal() {
	modal.classList.toggle("show-modal");
	const final_score = document.querySelector(".final-score");
	final_score.innerHTML = document.querySelector(".game-bar__stars").innerHTML;
	document.querySelector(".mc__seconds").innerHTML = seconds;

}

function windowOnClick(event) {
	if (event.target === modal) {
		toggleModal();
	}
}

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".mc__close-button");

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

/*
Code below handle the stopwatch
*/
const time = document.querySelector(".timer__sec");
let seconds = 0;
function timer() {
	t = setTimeout(function() {
		seconds++;
		time.innerHTML = seconds;
		timer();
	}, 1000);
}

function timerStop() {
	clearTimeout(t);
}

let cardsArray = []; // Declare empty array for memorize cards
let points = 0; // Declare points variable to count points
let flag = true; // Declare flag to check if the function can be performed
let moves = 0;
const button = document.querySelector(".game-bar__restart"); // Grab button element
const moves_info = document.querySelector(".moves__count");  // Grab html element with number of moves
const play_again = document.querySelector(".mc__play-again"); // Grab button in modal window

button.addEventListener("click", restartGame); // Restart game when button clicked

play_again.addEventListener("click", function () { // Restart game when button in modal window clicked, and hide modal
	restartGame();
	toggleModal();
});

// Grab all elements with "card__back" class
const card_backs = document.querySelectorAll(".card__back");

// Grab all elements with "icon-star" class
const stars = document.querySelectorAll(".icon-star");

shuffle();
addListeners();