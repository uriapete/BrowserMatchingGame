"use strict";
// tscode
// getting gameboard
const gameBoard = document.querySelector(".gameBoard");
// getting setup area
const gameSetUp = document.querySelector("div#settings");
// getting main setup area
const inputSettingsMain = document.querySelector("div#inputSettings");
// console.log(inputSettingsMain);
// getting row input
const rowInput = gameSetUp.querySelector("input#rows-input");
// getting columns input
const columnsInput = gameSetUp.querySelector("input#columns-input");
// getting start button
const startBtn = gameSetUp.querySelector("button#startButton");
// getting gamemode h2
const gameMode = document.querySelector("h2.gameMode");
// space for congrats text
const congrats = document.querySelector("h2.congrats");
// getting space for the number disp. num of cards
const spanNumOfCards = document.querySelector("span#numOfCards");
// getting space for warning text under settings
const noMatchWarn = document.querySelector("p#no-match-warning");
// getting flip at start button
const flipAtStartButton = gameSetUp.querySelector("button#flip-start-button");
// getting flip at start span (shows on or off)
const flipAtStartSpan = flipAtStartButton.querySelector("span#flip-start-val");
// getting strikes toggle button
const strikesToggleButton = gameSetUp.querySelector("button#toggle-strikes");
// console.log(strikesToggleButton);
// getting amt of strikes input
const maxStrikesInput = gameSetUp.querySelector("input#input-max-strikes");
// console.log(maxStrikesInput);
// getting strikes section span
const strikesDisplay = document.querySelector("span#num-of-strikes");
// console.log(strikesDisplay);
// getting amt per match/pair input
const cardsPerMatchInput = gameSetUp.querySelector("input#input-num-per-match");
// i think it's all good but if not I'll put more
// now for the JS-side game vars
const cardFront = "Match!";
class Card {
    constructor(cont, idnum) {
        this.content = cont;
        this.id = idnum;
    }
}
// for deck
let arrOfCards = [];
// counting the deck
let numOfCards = 0;
// number of cards (not pairs!) matched: should equal numOfCards at the end of the game
let numMatched = 0;
// if fails/strikes are enabled or not
let failsEnabled = false;
// amt of fails
let fails = 0;
// maximum amt of fails
let maxFails = 3;
// strings for strikes and no strikes
const noStrikeMark = "O";
const strikeMark = "X";
// array of strikes displayed on document
let strikeDispArr = [];
// amt of cards per "pair" or how many cards per match
let matches = 2;
// number of unmatched cards that are currently flipped
let numFlipped = 0;
// if game is currently active or not
let gameActive = false;
// if game is set to flip cards at beginning or not
let flipAtStart = true;
// if cards are flipped and timed out for checking
let cardTimeOut = false;
// array of cards (HTML div nodes) with .matched
let matchedCards;
// array of html cards 
let arrOfHTMLCards;
// now for functions
// i was going to have two params: rows : number, columns:number, but decided nah
function createDeck(numCards) {
    // for each card:
    for (let i = 0, j = 0; i < numCards; j++) {
        // i'm just gonna use a number ticking up as the card content for now
        const content = j.toString();
        // for each "pair"/match set, make new cards with same content, diff id
        for (let k = 0; k < matches; i++, k++) {
            arrOfCards.push(new Card(content, i));
        }
    }
}
function createTable(rows, columns) {
    // creating temp copy array so we can keep track of which cards have or have not been added already
    let cardArr = [...arrOfCards];
    // creating array of html cards
    let divCardArr = [];
    // for each row:
    for (let i = 0; i < rows; i++) {
        // create a row
        const row = document.createElement("div");
        // add row class
        row.classList.add("row");
        // append the row to the board
        gameBoard.appendChild(row);
        // for each column
        for (let j = 0; j < columns; j++) {
            // const element = array[j];
            // randomly select a card
            const cardSelArrNum = Math.floor(Math.random() * cardArr.length);
            // get card ID
            const selCardID = cardArr[cardSelArrNum].id;
            // create a card element
            const card = document.createElement("div");
            // add card class
            card.classList.add("card");
            // add card id num
            card.id = selCardID.toString();
            // add card front text
            card.innerHTML = cardFront;
            // remove card from temp arr (so we don't select it again)
            cardArr.splice(cardSelArrNum, 1);
            // append card to row
            row.appendChild(card);
            divCardArr.push(card);
        }
        // rowArr.push(row);
    }
    // return rowArr;
    return divCardArr;
}
// function to clear table
function clearTable() {
    gameBoard.innerHTML = "";
    arrOfCards = [];
    arrOfHTMLCards = [];
    gameMode.innerHTML = "";
    congrats.innerHTML = "";
    fails = 0;
    strikesDisplay.innerHTML = "";
    strikeDispArr = [];
    cardTimeOut = false;
}
// function to flip cards
function flipCard(card) {
    // add flip class
    card.classList.add("flip");
    // change text of card to back content
    card.innerHTML = arrOfCards[parseInt(card.id)].content;
    // add num of flipped cards
    numFlipped++;
}
function flipBack() {
    // get list of flipped cards
    const flippedCards = gameBoard.querySelectorAll("div.card.flip");
    // for each flipped card:
    for (let i = 0; i < flippedCards.length; i++) {
        const element = flippedCards[i];
        // set content back to front text and remove flip class
        element.innerHTML = cardFront;
        element.classList.remove("flip");
    }
    numFlipped = 0;
}
function checkMatch() {
    // get list of flipped cards
    const flippedCards = gameBoard.querySelectorAll("div.card.flip");
    // get string to match for: it doesnt matter which one we get it from, we're checking if all of them match anyways
    const matchFor = flippedCards[0].innerHTML;
    // for each card in the list after the first (since we grabbed the content of the first card, so of course the first one will match)...
    for (let i = 1; i < flippedCards.length; i++) {
        const element = flippedCards[i];
        // if the card doesn't match, break the loop and return false
        if (element.innerHTML !== matchFor) {
            return false;
        }
    }
    // this code should only run if everything matched, in that case return true
    return true;
}
// funct for checking if the game is done
function checkFinished() {
    // get all cards that are matched
    matchedCards = gameBoard.querySelectorAll("div.matched");
    // if all cards are matched, return true
    if (matchedCards.length >= numOfCards) {
        return true;
    }
    // else, return false
    else {
        return false;
    }
}
// function for turning from flips to matches
function flipToMatched() {
    // get all flipped cards
    const flippedCards = gameBoard.querySelectorAll("div.flip");
    // add .matched class and remove .flip to all
    for (let i = 0; i < flippedCards.length; i++) {
        const element = flippedCards[i];
        element.classList.add("matched");
        element.classList.remove("flip");
    }
    numFlipped = 0;
    return checkFinished();
}
// function for congrats text
function congratsText() {
    congrats.innerHTML = "Good job! You matched them all!";
    gameActive = false;
}
// function for creating/starting strikes
function createStrikes() {
    const strikeList = [];
    for (let i = 0; i < maxFails; i++) {
        const strikeElement = document.createElement("span");
        strikeElement.textContent = noStrikeMark;
        strikesDisplay.appendChild(strikeElement);
        strikeList.push(strikeElement);
    }
    return strikeList;
}
// function for ending game when strike limit is reached
function failGame() {
    // flip all cards that aren't already flipped
    for (let i = 0; i < arrOfHTMLCards.length; i++) {
        const element = arrOfHTMLCards[i];
        if (!((element.classList.contains("matched")) || (element.classList.contains("flip")))) {
            flipCard(element);
        }
    }
    congrats.textContent = "Too bad! Game over!";
    gameActive = false;
}
// function for counting and updating amt of cards on inputSettingsMain
function updateCountSettingDisplay() {
    // every input, these will be removed and updated
    spanNumOfCards.classList.remove("bold-red-text");
    spanNumOfCards.innerHTML = "";
    noMatchWarn.innerHTML = "";
    // if any of the inputs are blank or not numbers, warning then break
    if (isNaN(parseInt(rowInput.value) * parseInt(columnsInput.value)) || isNaN(parseInt(cardsPerMatchInput.value))) {
        noMatchWarn.innerHTML = "Please input numbers into all above fields.";
        return 0;
    }
    // if the game is not active and the inputs are filled with numbers:
    // calculate numOfCards
    numOfCards = parseInt(rowInput.value) * parseInt(columnsInput.value);
    // set matches
    matches = parseInt(cardsPerMatchInput.value);
    // set the html text on screen to numofcards
    spanNumOfCards.innerHTML = numOfCards.toString();
    // if numOfCards is below or not divisible by matches (default: 2): put up warnings
    if (numOfCards % matches !== 0 || numOfCards <= matches) {
        spanNumOfCards.classList.add("bold-red-text");
        noMatchWarn.innerHTML = `Number of cards needs to be above ${matches} and divisible by ${matches}!`;
    }
}
// function for startbutton
function startGame() {
    // calculate numOfCards
    numOfCards = parseInt(rowInput.value) * parseInt(columnsInput.value);
    // set matches
    matches = parseInt(cardsPerMatchInput.value);
    // if numOfCards is NaN, <= amt of cards per "pair", or not divisible by matches (default 2): break
    if ((isNaN(numOfCards) || (numOfCards <= matches) || (numOfCards % matches !== 0))) {
        return 0;
    }
    clearTable();
    // creating and showing strikes IF strikes are on
    if (failsEnabled) {
        maxFails = parseInt(maxStrikesInput.value);
        if (isNaN(maxFails)) {
            noMatchWarn.textContent = "Please input a number into \"Strikes\" form.";
            return 0;
        }
        strikeDispArr = createStrikes();
    }
    // else, set text content of strikes display to off
    else {
        strikesDisplay.textContent = "Off";
    }
    // this code should only run if numOfCards (and maxStrikes, if enabled) is usable:
    createDeck(numOfCards);
    // this function returns an array of the cards, so save it here
    arrOfHTMLCards = createTable(parseInt(rowInput.value), parseInt(columnsInput.value));
    // setting gamemode text
    gameMode.innerHTML = `${rowInput.value}x${columnsInput.value}`;
    // if flipAtStart is enabled, flip cards at beginning, pause, then flip back
    if (flipAtStart) {
        for (let i = 0; i < arrOfHTMLCards.length; i++) {
            const element = arrOfHTMLCards[i];
            flipCard(element);
        }
        setTimeout(() => {
            for (let i = 0; i < arrOfHTMLCards.length; i++) {
                const element = arrOfHTMLCards[i];
                flipBack();
            }
        }, 3000);
    }
    // now let's make event listeners for the new cards
    for (let i = 0; i < arrOfHTMLCards.length; i++) {
        // element = this card
        const element = arrOfHTMLCards[i];
        // i can't move this funct definition outside the event list bc it uses element and this (TS is throwing a fit over this having type any) and i am not sure how to deal with that
        // adding event listeners to the cards
        element.addEventListener("click", function () {
            // below if statement usually shouldn't run at all, but redundancy is good
            // if game isn't active, break
            if (!gameActive) {
                return 0;
            }
            // if cards are being timed out for checking, break
            if (cardTimeOut) {
                return 0;
            }
            // if the element is already matched, break
            if (element.classList.contains("matched")) {
                return 0;
            }
            // if the element is already flipped, break
            if (element.classList.contains("flip")) {
                return 0;
            }
            // the following code should only run if the card wasn't already matched
            // flip this card
            flipCard(this);
            // if number of flipped cards >= matches
            if (numFlipped >= matches) {
                // add a mark to not allow matches before the timeout funct executes!
                cardTimeOut = true;
                // set a timeout so the user can see what cards they matched
                setTimeout(function () {
                    // check if the cards match
                    const isMatch = checkMatch();
                    // if they do: 
                    if (isMatch) {
                        // turn the cards into matched cards and check if the game is done:
                        let isDone = flipToMatched();
                        // if it is:
                        if (isDone) {
                            congratsText();
                        }
                    }
                    else if (failsEnabled) {
                        strikeDispArr[fails].textContent = strikeMark;
                        fails++;
                        if (fails >= maxFails) {
                            // end the game
                            failGame();
                            return 0;
                        }
                    }
                    // flip back all unmatched cards
                    flipBack();
                    // let the system know timeout is done for checking
                    cardTimeOut = false;
                }, 500);
            }
        });
    }
    gameActive = true;
}
// event listeners:
// event listener for counting amt of cards
inputSettingsMain.addEventListener("input", updateCountSettingDisplay);
// event listener for fails toggle
strikesToggleButton.addEventListener("click", function () {
    if (failsEnabled) {
        failsEnabled = false;
        this.classList.remove("flip-at-start-on");
        this.classList.add("flip-at-start-off");
    }
    else {
        failsEnabled = true;
        this.classList.remove("flip-at-start-off");
        this.classList.add("flip-at-start-on");
    }
});
// event listener for flip-start toggle
flipAtStartButton.addEventListener("click", function () {
    if (flipAtStart) {
        flipAtStart = false;
        this.classList.remove("flip-at-start-on");
        this.classList.add("flip-at-start-off");
        flipAtStartSpan.innerHTML = "Off";
    }
    else {
        flipAtStart = true;
        this.classList.remove("flip-at-start-off");
        this.classList.add("flip-at-start-on");
        flipAtStartSpan.innerHTML = "On";
    }
});
// event listener for clicking startbtn
startBtn.addEventListener("click", startGame);
