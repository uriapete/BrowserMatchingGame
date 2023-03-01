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
// now for the JS-side game vars
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
// now for functions
// i was going to have two params: rows : number, columns:number, but decided nah
function createDeck(numCards) {
    // numOfCards = rows*columns;
    // for each card:
    for (let i = 0, j = 0; i < numCards; i++, j++) {
        // const element = array[i];
        // i'm just gonna use a number ticking up as the card content for now
        const content = j.toString();
        // make a new card and push it to arrOfCards
        arrOfCards.push(new Card(content, i));
        // make another new card with same content, diff id, and push to arrOfCards
        i++;
        arrOfCards.push(new Card(content, i));
    }
}
createDeck(8);
console.log(arrOfCards);
