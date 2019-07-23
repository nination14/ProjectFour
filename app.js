/* Treehouse FSJS Techdegree
* Project 4 - OOP Game App
* Phrase.js */ //Creates a phrase class to handle the creation of phrases

let game = new Game(); //Declaring my var 

document.getElementById('btn__reset').addEventListener('click', () => {
	game = new Game();
	game.startGame();
});

const keyElements = document.querySelectorAll('.key'); //Getting key elements
keyElements.forEach(keyElement => { //Adding event listeners 
 	keyElement.addEventListener('click', () => { //Listens for clicks
 		game.handleInteraction(keyElement);
 	});
});

//Xtra Credit  
document.addEventListener("keyup", (event) => { //Adding event lister so that pressing the actual keypad buttons will be associated to the onscreen keyboard buttons
    if (game.activePhrase == '') {
        return;
    }
    if (event.keyCode >= 65 && event.keyCode <= 90 ) {
        const button = $(`.keyrow button:contains(${event.key})`);
        if (button.prop('disabled') == false) {
            game.handleInteraction(button);
        }
    }
});

