let status = document.getElementById('status');
let overLayDiv = document.querySelector('#overlay');
let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let gameButton = document.querySelector('.btn__reset');
let keyrowBtn = document.querySelectorAll('.keyrow button');
let missed = 0;
let phrases = [
    "FOCUS ON GOALS NOT OBSTACLES",
    "THOUGHTS BECOME THINGS",
    "LITTLE THINGS MAKE BIG DAYS",
    "SOMETIMES LATER BECOMES NEVER ",
    "DREAMS WEIGH MORE THAN EXCUSES",
    'HARD DOES NOT MEAN IMPOSSIBLE'
];
let phraseArray = getRandomPhraseAsArray(phrases);
let match = ''; 

gameButton.addEventListener('click', () => {
    gameButton.style.display = "none";    
    overLayDiv.style.display = 'none';
    if (gameButton.textContent === 'Try Again!') {
        newGame();
    }
});

// Create function that will get a random phrase from the phrases array
function getRandomPhraseAsArray(arr) {
    let randomNumber = Math.floor( Math.random() * arr.length);
    let phraseIndex = phrases[randomNumber];
    return phraseIndex;
}

function addPhraseToDisplay(randomArr) {
    let randomPhrase = randomArr;
    let ul = document.querySelector('#phrase ul');    
    
        for ( let i = 0; i < randomPhrase.length; i++ ) {
            let li = document.createElement('li');
            li.textContent = randomPhrase[i];
                if (li.textContent !== " ") {
                    li.className = 'letter';                    
                } else {
                    li.className = 'space';
                }
            ul.appendChild(li);
        }
}

function checkLetter(guess) {    
    let btnClicked = guess.toUpperCase();
    let phraseList = document.querySelectorAll('li.letter');
    let heartLI = document.querySelectorAll('li.tries');   
    let scoreboardList = document.querySelector('#scoreboard ol');   
    let match = null; 
   
        for ( let i = 0; i < phraseList.length; i++ ) {
            if (btnClicked === phraseList[i].textContent) {                
                phraseList[i].className = 'show swing';   
                match = btnClicked;      
            } 
        }
            if ( match === null && heartLI.length > 0) {
            scoreboardList.removeChild(heartLI[0]);
            missed++;          
        }
        return match; 
}                    

function checkWin() {
    let phraseLetters = document.querySelectorAll('li.letter');
    let phraseShow = document.querySelectorAll('li.show');
    let randomPhrase = phraseLetters.length + phraseShow.length;
    
        if (randomPhrase === phraseShow.length) {
            overLayDiv.style.display = '';
            overLayDiv.className = "win";   
            gameButton.style.display = "inline-block"; 
            gameButton.textContent = "Try Again!" 
            document.getElementById("status").innerHTML = "You Win!";              
        }
        if (missed === 5) {       
            overLayDiv.style.display = '';
            overLayDiv.className = "lose";   
            gameButton.style.display = "inline-block"; 
            gameButton.textContent = "Try Again!";            
            document.getElementById("status").innerHTML = "You Lose!";              
        }
}

function newGame() {
    let ul = document.querySelector('#phrase ul');  
    let li = document.querySelector('#phrase ul li'); 
    let phraseLetters = document.querySelectorAll('li.letter');
    let phraseSpaces = document.querySelectorAll('li.space');
    let phraseShow = document.querySelectorAll('li.show');
    let scoreboardList = document.querySelector('#scoreboard ol'); 

    for (let i = 0; i < phraseLetters.length; i++ ){
        ul.removeChild(phraseLetters[i]);        
    }
    for (let i = 0; i < phraseSpaces.length; i++ ){
        ul.removeChild(phraseSpaces[i]);
    }
    for (let i = 0; i < phraseShow.length; i++ ){
        ul.removeChild(phraseShow[i]);
    }
    for (let i = 0; i < keyrowBtn.length; i++ ){
        if (keyrowBtn[i].tagName === 'BUTTON') {
            keyrowBtn[i].className = '';
            keyrowBtn[i].disabled = false;
        }
    }
    for (let i = 0; i < missed; i++ ){        
        scoreboardList.innerHTML += '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';     
    }
    
    missed = 0;    
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

qwerty.addEventListener('click', (event) => {
    let letterFound = '';
    if (event.target.tagName === 'BUTTON') {
        event.target.className = 'chosen';
        event.target.disabled = true;
        letterFound = event.target.textContent;
        checkLetter(letterFound);
    }   
    checkWin();    
});

addPhraseToDisplay(phraseArray);