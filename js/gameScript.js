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
const numOfCards = document.querySelector("span#numOfCards");
// console.log(numOfCards);
// i think it's all good but if not I'll put more
// now for the JS-side game vars
class Card {
    constructor(cont, idnum) {
        this.content = cont;
        this.id = idnum;
    }
}
