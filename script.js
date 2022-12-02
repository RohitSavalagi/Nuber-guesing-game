//==========================variables===========================================

var remain = 6;
console.log(myRange)

//==========================dom selectors
var myRange = document.getElementById("myrange");
const remaining = document.querySelector('#lastResult');
var returnResult = document.getElementById('currentResult');
const startOver = document.getElementById("newStarting");
var returnHistory = document.getElementById('resultHistory');
//Selecting By Tag
var label = document.getElementsByTagName("label")[0];
//Input text feild
let getInputValue = document.getElementById("getGuess")

//==========================creating dom elements 

const p = document.createElement('p');
var max = myRange.value;
console.log("max value is set to " + max)
var rand = getRandom(0, max);
document.getElementById("randBox").innerHTML = `<span>${rand}<span>`;


//===================variables

var numOfGuess = 1;
let playGame = true;
let history = []



//====================buttons
let submit = document.getElementById("sub")
// let restartBtn = $('#reset')
let restartBtn = document.getElementById('reset')




//functionalities
restartBtn.disabled = true


//=====================================Main Functions==========================================
//===============Starting Game================================

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        // alert("Checking Functionality")
        const guess = parseInt(getInputValue.value);
        validateGuess(guess);
    })
};
//====================================End Main Funactio========================================


//====================================Supporting Functions=====================================

//=======Input validation 

function validateGuess(guess) {
    
    // document.getElementById("rangeLabel").click();re
    
    if (isNaN(guess)) {
        alert('Please Enter a valid Number');
    }
    else if (guess < 1) {
        alert('Please enter number greater than 1');
    }
    
    else if (guess > max) {
        alert("please Enter a value lesser than " + max);
    }
    
    else {
        history.push(guess);
        displayGuesses(guess);
        checkGuess(guess);
    }
}


//=======Check the Guess is correct or not and closness

function checkGuess(guess) {
    var flag = 0;
    // console.log(numOfGuess)
    console.log(remain)
    if (guess == rand) {
        returnResult.innerHTML =
        '<div class="alert alert-success">Awesome job, you got it!</div>';
        endGame();
        flag = 1;
    }
    else if (guess < rand ) {
        returnResult.innerHTML =
        '<div class="alert alert-warning">Your guess is low!</div>';
    }
    else if (guess > rand ) {
        returnResult.innerHTML =
        '<div class="alert alert-warning">Your guess is high!</div>';
    }
    
    // if Guess Crosses 5 and 
    if (numOfGuess >= (remain) && flag == 0) {
        flag = 0;
        returnResult.innerHTML =
        `<div class="alert alert-lost">You Lost the Match <br>Number was ${rand}</div>`;
        endGame();
    }
    myRange.disabled = true;
}

//Pushing and Showing  History
//Updating No Of Guesses
function displayGuesses(guess) {
    restartBtn.disabled = false;
    getInputValue.value = '';
    var createHistoryElement = document.createElement('div');
    createHistoryElement.classList.add('list-group-item');
    createHistoryElement.innerText =  guess;
    returnHistory.append(createHistoryElement);
    numOfGuess++;
    remaining.innerHTML = `${remain - numOfGuess} `;
    myRange.disabled = true;
}

//Ending Game Win Or Lose 


function endGame() {
    
    getInputValue.value = "";
    getInputValue.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<button id="newGame" class="newGame">Start New Game</button>`
    startOver.appendChild(p);
    playGame = false;
    restartBtn.disabled = true
    console.log("disabled")
    document.getElementById('resultHistory').innerHTML = "";

    newGame();
    
}




//After Loosing or Wining  => Starting a New Match

//Adding an Event Listner
function newGame() {
    document.getElementById('newGame').addEventListener('click', newStarting, false)
}
//function according to event
function newStarting() {
    // console.log("newStarting is pressed")
    // max = myRange.value;
    newreset()
    // remaining.innerHTML = `5`;
    reviseMax();
    startOver.removeChild(p);
}

//After Clicking Reset Button 

function reseting() {
    // console.log("Reseting is pressed")
    // max = myRange.value;
   newreset()
    //startOver.removeChild(p);  
    // remaining.innerHTML = `5`;
    reviseMax()
}

function newreset(){
    rand = parseInt((Math.random() * 100) + 1);
    console.log(rand)
    history = [];
    numOfGuess = 1;
    remain = parseInt(Math.floor(Math.log(max))) + 1
    returnResult.innerHTML = ""
    document.getElementById('resultHistory').innerHTML = "";
    remaining.innerHTML = `${6 - numOfGuess} `;
    getInputValue.removeAttribute('disabled');
    playGame = true;
    // document.getElementById('getGuess').click();
    restartBtn.disabled = true
    label.click();
    myRange.disabled = false;
    myRange.value = 100;
    document.getElementById("valBox").innerHTML = "100"
    getInputValue.value = ""
}


//Key Press Code

getInputValue.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      submit.click();
    }
  });

//showing value in range value

function showVal(newVal) {
    document.getElementById("valBox").innerHTML = newVal;
    max = myRange.value;
    console.log("Now Max value is revised according to range")
    remain = parseInt(Math.floor(Math.log(max))) + 1;
    remaining.innerHTML = `${remain - numOfGuess} `;
    rand = getRandom(0, max);
    document.getElementById("randBox").innerHTML = `${rand}`;
    console.log(rand + " is the random number")
    document.getElementById("valBox").innerHTML = `<p>${max}</p>`;
}

function reviseMax(){
    max = myRange.value;
    console.log("Now Max value is revised according to range")
    remain = parseInt(Math.floor(Math.log(max))) + 1;
    remaining.innerHTML = `${remain - numOfGuess} `;
}



//=====Geting Random number

function getRandom(_min , _max){
    document.getElementById("randBox").innerHTML = `<span>${rand}<span>`;
    return parseInt(Math.random() * _max)
}

//Diabling the range 

function _disable(){
   
    myRange.disabled = true;
    console.log("Range is Disabled")

}


