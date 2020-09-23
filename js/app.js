let status = document.getElementById('status');
let overLayDiv = document.querySelector('#overlay');
let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let gameButton = document.querySelector('.btn__reset');
let keyrowBtn = document.querySelectorAll('.keyrow button');
let missed = 0;
let phrases = [
    "IT WAS ALL A DREAM",
    "IF I WAS A BILLIONARE",
    "EVERYDAY PEOPLE",
    "JUST DO IT",
    "DREAMS WEIGH MORE THAN EXCUSES",
    'KILLING ME SOFTLY'
];
let match = ''; 

gameButton.addEventListener('click', () => {
    gameButton.style.display = "none";    
    overLayDiv.style.display = 'none';

    if (gameButton.textContent === 'Try Again!') {
        newGame();
        // phrase.removeChild(ul);
        // document.location.reload();
    }
});

// Create function that will get a random phrase from the phrases array
function getRandomPhraseAsArray(arr) {
    let randomNumber = Math.floor( Math.random() * arr.length);
    let phraseIndex = phrases[randomNumber];
    //console.log(`Inside loop to get ${phraseIndex}`) 
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
    console.log(`button clicked: ${btnClicked}`);
    let phraseList = document.querySelectorAll('li.letter');
    let heartLI = document.querySelectorAll('li.tries');   
    let scoreboardList = document.querySelector('#scoreboard ol');   
    let match = null; 
   
        for ( let i = 0; i < phraseList.length; i++ ) {
            if (btnClicked === phraseList[i].textContent) {                
                phraseList[i].className = 'show';   
                match = btnClicked;                
                console.log(`matched letter: ${match}`);         
            } 
        }        
        
        console.log(`Out of loop ${match}`);       
        
        if ( match === null && heartLI.length > 0) {
            scoreboardList.removeChild(heartLI[0]);
            missed++;
            console.log(`Missed count: ${missed}`);            
        }
        return match; 
}                    

function checkWin() {
    let phraseLetters = document.querySelectorAll('li.letter');
    let phraseShow = document.querySelectorAll('li.show');
    let randomPhrase = phraseLetters.length + phraseShow.length;
    console.log(`Phrase letter count: ${randomPhrase}`);
    console.log(`Phrase Letters: ${phraseLetters.length} and Phrase Show Class: ${phraseShow.length}`)
    
        if (randomPhrase === phraseShow.length) {
            console.log('You win');
            overLayDiv.style.display = '';
            overLayDiv.className = "win";   
            gameButton.style.display = "inline-block"; 
            gameButton.textContent = "Try Again!" 
            document.getElementById("status").innerHTML = "You Win!";  
            // newGame();
        }

        if (missed === 5) {
            console.log('You lose');           
            overLayDiv.style.display = '';
            overLayDiv.className = "lose";   
            gameButton.style.display = "inline-block"; 
            gameButton.textContent = "Try Again!";            
            document.getElementById("status").innerHTML = "You Lose!";  
            // newGame();
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
        console.log(`Keyrows: ${keyrowBtn.length}`);
        if (keyrowBtn[i].tagName === 'BUTTON') {
            keyrowBtn[i].className = '';
            keyrowBtn[i].disabled = false;
        }
    }

    for (let i = 0; i < missed; i++ ){        
        scoreboardList.innerHTML += '<li class="tries"><img src="images/liveHeart.png" height="35px" width="30px"></li>';     
    }
    missed = 0;
    
    getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    // console.log(`${phraseArray}`);

    // document.location.reload();
}

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
console.log(`${phraseArray}`); 


qwerty.addEventListener('click', (event) => {
    let letterFound = '';
    console.log(letterFound); 
    if (event.target.tagName === 'BUTTON') {
        event.target.className = 'chosen';
        event.target.disabled = true;
        letterFound = event.target.textContent;
        checkLetter(letterFound);        

    }   console.log(`letter returned: ${letterFound}`); 

    checkWin();
    
});