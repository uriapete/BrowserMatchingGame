// NOTE: THIS IS NOT THE ACTUAL JS FILE! THIS IS NOT MEANT TO BE RUN!
/*

class Card {
    constructor(contentn, idnum){
        this.content = content
        this.id = `card${idnum}`
    }
}

let arrayOfCards = [];
This will be our deck

let numberOfCards; <= total in deck/table

let numberMatched; <= number of cards that are matched (not pairs! when the game is finished, this should === numOfCards)


let fails = 0; <= this is amount of fails

let maxFails = 3 <= will be 3 by default, but might be changeable later, so setting parameter for easy control later

let matches = 2 <= how many cards per "pair", 2 by default but might be changed to be changable later

let numFlipped = 0; <= how many unmatched cards are flipped

let gameActive = false

get nodes from document (querySelector, etc)

let matchedCards; <= this will be an array of cards with .matched

funct createDeck(){
    numOfCards = rows*columns

    rows * columns, make that many cards (new Card())

    make two of every card, so there should be rows*cols amount of cards, and half that many pairs

    (make a for loop, id with iterator)

    push all to arrayOfCards
}

funct createTable(){
    loop: for each row (create a new row, then){
        randomly append cards to the row until you reach amount of columns
        use card object id for html id
    }
}

funct clearTable(){
    remove table rows
}

funct flipToContent(card){
    append content to card as child
    append .flip
}

funct flipBack(){
    get all nodes in table .flip
    remove content, remove .flip
}

funct checkMatch(){
    get all nodes in table with .flip
    check if contents match
    return true if yes, false if no
}

funct checkFinished(){
    get all cards in table with .matched, save to matchedCards arr
    if matchedCards.length === (or >=) numOfCards, return true
}

funct flipToMatched(){
    get all nodes in table with .flip
    append .matched
    remove .flip
    if checkFinished: return true if yes, false if no
}

funct congratsText(){
    add text near top, below settings: "Good job! You matched them all!"
    maybe I'll add a timer later
    set gameActive = false
}

when startButton is clicked: {
    reset fails to 0
    clearTable, then createDeck, then createTable.
    gameActive = true
}

when a card is clicked: {
    if matched: stop
    else {
        flipToContent
        if num flipped >= matches: check if match
        if checkMatch: {
            if flipToMatch (which will return checkFinished): congrats text if yes, do nothing if no
        } else flipBack
    }
}

*/