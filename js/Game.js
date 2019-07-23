/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() { // constructor method
        this.missed = 0; // starts with 0 misses
        this.phrases = this.createPhrases(); //Array of phrase objects
        this.activePhrase = (null); // Phrase object thats currently in play. Null represents no value.
    }

    createPhrases() { //Creates and returns array of phrases to be used in the game
        const myPrases = [
            new Phrase ('Come Back To Earth'),
            new Phrase ('So It Goes'),
            new Phrase ('Missed Calls'),
            new Phrase ('Objects In The Mirror'),
            new Phrase ('Someone Like You')
        ];
        return myPrases;
    }

    getRandomPhrase() {  // Selects and returns random phrase from phrases property 
        const phraseIndex =[Math.floor(Math.random() * this.phrases.length)]; //Created a var and used it to randomly give me a phrase 
        return this.phrases[phraseIndex]; //Returns the phrase object chosen to be used
    }

    startGame() { // Begins game 
        $("#overlay").hide(); //Add overlay and hides it
        this.activePhrase = this.getRandomPhrase() //Gets random phrase when game starts 
        this.activePhrase.addPhraseToDisplay(); //Displayes phrase when game starts
    }

    checkForWin() { //If game is won returns true other wise it will return false
        if ($(".show").length == $('.letter').length) {
            this.gameOver(true);
            
        }
     }

    gameOver(gameWon) { // Shows the dialog box after the game letting user know if they won or lost
        $("#overlay").show();
        if (gameWon == true) {
           $("#game-over-message").empty().append("Thats Right! Guess again?");
           $("#overlay").removeClass("start").addClass("win");
        }
        else {
            $("#game-over-message").empty().append("Bruh! Guess again?");
            $("#overlay").removeClass("start").addClass("lose");
        }
                                   
        this.activePhrase = ''; // Set active phrase to nothing so app will not accept keyboard input
        
        $(".key").attr("disabled", false).removeClass("chosen").removeClass("wrong");
        // Reset heart lives
        $(".tries img").attr("src", "images/liveHeart.png");
    };

    //This will count how many hearts are being deducted and if the total number of deducted hearts equals 5 the game is over
    removeLife()
    {
        let allHearts = document.querySelectorAll('img');
        let liveHeart = allHearts[this.missed];
        liveHeart.src = 'images/lostHeart.png';
        
        this.missed++;
        
        if(this.missed === 5) {
            this.gameOver(false);
        }
    }
   //handles the users interaction and checks letter against phrase. this will 
   //check for win  and adds chosen class otherwise it will add wrong class and remove life.
    handleInteraction(button) {
        $(button).attr("disabled", true);
        if (!this.activePhrase.checkLetter($(button).text())) {
            $(button).addClass("wrong");
            this.removeLife();
        }
        else {
            $(button).addClass("chosen");
            this.activePhrase.showMatchedLetter($(button).text());
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        }
    }
};
