function turnCard() {
    var card = this.children[0];
    card.style.display="block";
    cardsArray.push(card);
    if (cardsArray.length == 2) {

    	setTimeout(checkReversals, 1550);
    }
}

function checkReversals() {
	if (cardsArray[0].className == cardsArray[1].className) {
		console.log("well done");
		cardsArray = [];
		points += 1;
		if (points == 8) {
			alert("WELL DONE");
		}
	}
	else {
		cardsArray[0].style.display="none";
		cardsArray[1].style.display="none";
		cardsArray = [];
	}
}

var cards = document.querySelectorAll(".card");  

cards.forEach(function(card) {
	card.addEventListener("click", turnCard);
});

var cardsArray = [];
var points = 0;