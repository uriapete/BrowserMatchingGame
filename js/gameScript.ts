// const helloWorldMsg : string = "Hello World!";
// console.log(helloWorldMsg);

// do comments travel over too? indeed they do.

// this is my first time playing with typescript so putting this here to remind myself:

// remember to tsc -p jsFolder or else all of your lets and consts will be turned into disgusting vars

// getting gameboard
const gameBoard: HTMLDivElement = document.querySelector(".gameBoard")!;

// console.log(gameBoard);

// getting setup area
const gameSetUp: HTMLDivElement = document.querySelector("div.gameSetUp")!;

// console.log(gameSetUp);

// getting row input
const rowInput: HTMLInputElement = gameSetUp.querySelector("input#rows-input")!;

// console.log(rowInput);

// getting columns input
const columnsInput: HTMLInputElement = gameSetUp.querySelector("input#columns-input")!;

// console.log(columnsInput);

// getting start button
const startBtn: HTMLDivElement = gameSetUp.querySelector("button#startButton")!;

// console.log(startBtn);

// making a test event listener for the rows, columns, and start button
// startBtn.addEventListener("click",()=>{
//     console.log(rowInput.value)
//     console.log(columnsInput.value)
// })
// all good

// getting gamemode h2
const gameMode: HTMLHeadingElement = document.querySelector("h2.gameMode")!;

// console.log(gameMode);

const congrats: HTMLHeadingElement = document.querySelector("h2.congrats")!;

// console.log(congrats);

const spanNumOfCards: HTMLSpanElement = document.querySelector("span#numOfCards")!;

// console.log(numOfCards);
// i think it's all good but if not I'll put more

// now for the JS-side game vars

class Card {
    content: string;
    id: number;
    constructor(cont: string, idnum: number) {
        this.content = cont;
        this.id = idnum;
    }
}

// for deck
let arrOfCards : Array<Card> = [];

// counting the deck
let numOfCards : number = 0;