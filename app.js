/*
The function below shows shape of card back
and adds the revealing mechanics
*/
function turnCard() {
	if (flag == true) { // only if flag == true, carry on
	    const card = this.children[0]; // assign children element of clicked div to variable
	    card.style.display="block"; // change style of display to show the shape
	    cardsArray.push(card); // and push it "cardsArray" 
	    this.removeEventListener("click", turnCard); // remove event listener to prevent next clicks

	    if (cardsArray.length == 2) { // if 2 cards were clicked
	    	moves += 1; // count moves
	    	changeStars(); // check function conditions
	    	document.querySelector(".moves__count").innerHTML = moves;
	    	flag = false; // change flag to false to prevent next clicks on whole game board until animation end
	    	setTimeout(checkReversals, 155); // call next function, with delay 1500ms
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
		points += 1; // add 1 point
		if (points == 8) { // if points == 8 you won ;)
			alert("WELL DONE");
		}	
	}
	else { // if card back weren't the same:
		cardsArray[0].style.display="none"; // hide cards
		cardsArray[1].style.display="none";
		
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
	if (moves == 12) {
		stars[2].className = "icon-star-half-alt";
	}
	else if (moves == 15) {
		stars[2].className = "icon-star-empty";
	}
	else if (moves == 18) {
		stars[1].className = "icon-star-half-alt";
	}
	else if (moves == 21) {
		stars[1].className = "icon-star-empty";
	}
	else if (moves == 24) {
		stars[0].className = "icon-star-half-alt";
	}
	else if (moves == 27) {
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
Code below assign all html elements with class 
"card" to cards variable, then add 
Event Listener to each of them
*/
const cards = document.querySelectorAll(".card");
cards.forEach(function(card) {
	card.addEventListener("click", turnCard);
});


let cardsArray = []; // Declare empty array for memorize cards
let points = 0; // Declare points variable to count points
let flag = true; // Declare flag to check if the function can be performed
let moves = 0;

// Grab all elements with "card__back" class
const card_backs = document.querySelectorAll(".card__back");

// Grab all elements with "icon-star" class
const stars = document.querySelectorAll(".icon-star");
shuffle();

