"use strict";
// const helloWorldMsg : string = "Hello World!";
// console.log(helloWorldMsg);
// do comments travel over too? indeed they do.
// this is my first time playing with typescript so putting this here to remind myself:
// remember to tsc -p jsFolder or else all of your lets and consts will be turned into disgusting vars
// getting gameboard
const gameBoard = document.querySelector(".gameBoard");
// console.log(gameBoard);
// getting setup area
const gameSetUp = document.querySelector("div.gameSetUp");
// console.log(gameSetUp);
// getting row input
const rowInput = gameSetUp.querySelector("input#rows-input");
// console.log(rowInput);
// getting columns input
const columnsInput = gameSetUp.querySelector("input#columns-input");
// console.log(columnsInput);
// getting start button
const startBtn = gameSetUp.querySelector("button#startButton");
// console.log(startBtn);
// making a test event listener for the rows, columns, and start button
// startBtn.addEventListener("click",()=>{
//     console.log(rowInput.value)
//     console.log(columnsInput.value)
// })
// all good
// getting gamemode h2
const gameMode = document.querySelector("h2.gameMode");
// console.log(gameMode);
const congrats = document.querySelector("h2.congrats");
// console.log(congrats);
const spanNumOfCards = document.querySelector("span#numOfCards");
// console.log(numOfCards);
// i think it's all good but if not I'll put more
const cardFront = "Match!";
// now for the JS-side game vars
class Card {
    constructor(cont, idnum) {
        // console.log(`Creating a new card with content ${cont} and ID ${idnum}`);
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
// amt of fails
let fails = 0;
// maximum amt of fails
let maxFails = 3;
// amt of cards per "pair" or how many cards per match
let matches = 2;
// number of unmatched cards that are currently flipped
let numFlipped = 0;
// if game is currently active or not
let gameActive = false;
// array of cards (HTML div nodes) with .matched
let matchedCards = [];
// array of html cards ughh
let arrOfHTMLCards = [];
// now for functions
// i was going to have two params: rows : number, columns:number, but decided nah
function createDeck(numCards) {
    // numOfCards = rows*columns;
    // for testing:
    // console.log(arrOfCards.length);
    // for each card:
    for (let i = 0, j = 0; i < numCards; j++) {
        // const element = array[i];
        // i'm just gonna use a number ticking up as the card content for now
        const content = j.toString();
        // make a new card and push it to arrOfCards
        // console.log(`Creating a new card with content ${j} and ID ${i}`);
        // let card1: Card = new Card(content, i);
        // console.log(card1);
        // arrOfCards.push(card1);
        // console.log(arrOfCards);
        arrOfCards.push(new Card(content, i));
        // make another new card with same content, diff id, and push to arrOfCards
        i++;
        // console.log(`Creating a new card with content ${j} and ID ${i}`);
        // let card2: Card = new Card(content, i);
        // console.log(card2);
        // arrOfCards.push(card2);
        // console.log(arrOfCards);
        arrOfCards.push(new Card(content, i));
        i++;
        // console.log(arrOfCards.length);
    }
    // console.log(arrOfCards)
}
// createDeck(8);
// console.log(arrOfCards);
// all good
function createTable(rows, columns) {
    // creating temp copy array so we can keep track of which cards have or have not been added already
    let cardArr = [...arrOfCards];
    // creating array of rows
    // let rowArr: Array<HTMLDivElement> = [];
    // creating array of html cards
    let divCardArr = [];
    // for each row:
    for (let i = 0; i < rows; i++) {
        // const element = array[i];
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
// console.log(document.createElement("div"));
// FOR TESTING ONLY (but full code will probs be based on this): 
startBtn.addEventListener("click", () => {
    // arrOfCards = [];
    let cardnums = parseInt(rowInput.value) * parseInt(columnsInput.value);
    // console.log(cardnums);
    createDeck(cardnums);
    arrOfHTMLCards = createTable(parseInt(rowInput.value), parseInt(columnsInput.value));
    for (let i = 0; i < arrOfHTMLCards.length; i++) {
        const element = arrOfHTMLCards[i];
        element.addEventListener("click", function () {
            // console.log(this);
            // flipCard(this);
            if (this.classList.contains("matched") || this.classList.contains("flip")) {
                return 0;
            }
            else {
                flipCard(this);
                if (numFlipped >= matches) {
                    setTimeout(() => {
                        if (checkMatch()) {
                            console.log("yay! you got one");
                        }
                        else {
                            flipBack();
                        }
                    }, 1000);
                }
            }
        });
    }
});
// TESTING FLIP CARDS
// gameBoard.addEventListener("click", function(e){
//     // this;
//     const card : HTMLDivElement = this.closest("div.card")!;
//     console.log(card);
// })
// gameBoard.addEventListener()
// MORE TESTING
// let testCard01 : Card = new Card('uwu', 4);
// console.log(testCard01);
// console.log(arrOfCards);
// arrOfCards.push(testCard01);
// console.log(arrOfCards);
// for (let i = 0; i < 4; i++) {
//     let testcard : Card = new Card("owo", i);
//     console.log(testcard);
//     console.log(arrOfCards);
//     arrOfCards.push(testcard);
//     console.log(arrOfCards);
// }
