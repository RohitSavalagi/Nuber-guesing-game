var remain = 6;
var myRange = document.getElementById("myrange");
console.log(myRange)

//creating dom elements 
const p = document.createElement('p');
var max = myRange.value;
    console.log("max value is set to " + max)
var rand = getRandom(0, max);
document.getElementById("randBox").innerHTML = `<span>${rand}<span>`;
//dom selectors
const remaining = document.querySelector('#lastResult');
var returnResult = document.getElementById('currentResult');
const startOver = document.getElementById("newStarting");
var returnHistory = document.getElementById('resultHistory');
//Selecting By Tag
var label = document.getElementsByTagName("label")[0];
//variables

var numOfGuess = 1;
let playGame = true;
let history = []

//checking functionality

//buttons
let submit = document.getElementById("sub")
let restartBtn = $('#reset')
let reset = document.getElementById("reset")

//Input text feild
let getInputValue = document.getElementById("getGuess")

//functionalities
restartBtn.hide();

if (playGame) {
    submit.addEventListener("click", function (e) {
        e.preventDefault();
        // alert("Checking Functionality")
        const guess = parseInt(getInputValue.value);
        validateGuess(guess);
    })
};


//Input validation 

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


//Check the Guess is correct or not and closness

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
    document.getElementById("myrange").setAttribute.disabled = true;
}

//Pushing and Showing  History
//Updating No Of Guesses
function displayGuesses(guess) {
    restartBtn.show();
    getInputValue.value = '';
    var createHistoryElement = document.createElement('div');
    createHistoryElement.classList.add('list-group-item');
    createHistoryElement.innerText =  guess;
    returnHistory.append(createHistoryElement);
    numOfGuess++;
    remaining.innerHTML = `${remain - numOfGuess} `;
    //this line added
    document.getElementById("myrange").disabled = true;
}

//Ending Game Win Or Lose 


function endGame() {
    
    getInputValue.value = "";
    getInputValue.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<button id="newGame" class="newGame">Start New Game</button>`
    startOver.appendChild(p);
    playGame = false;
    restartBtn.hide();
    document.getElementById('resultHistory').innerHTML = "";
    newGame();
    
}




//After Loosing or Wining  => Starting a New Match

//Adding an Event Listner
function newGame() {
    $('.newGame')[0].addEventListener('click', newStarting, false)
}
//function according to event
function newStarting() {
    // console.log("newStarting is pressed")
    rand = parseInt((Math.random() * 100) + 1);
    console.log(rand)
    history = [];
    numOfGuess = 1;
    remain = parseInt(Math.floor(Math.log(max))) + 1
    returnResult.innerHTML = ""
    document.getElementById('resultHistory').innerHTML = "";
    remaining.innerHTML = `${6 - numOfGuess} `;
    getInputValue.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
    document.getElementById('getGuess').click();
    restartBtn.hide();
    label.click();
    document.getElementById("myrange").disabled = false;
    document.getElementById("myrange").value = 100;
    document.getElementById("valBox").innerHTML = "100"
    remaining.innerHTML = `5`;
}

//After Clicking Reset Button 

function reseting() {
    // console.log("Reseting is pressed")
    rand = parseInt((Math.random() * 100) + 1);
    console.log(rand)
    history = [];
    remain = parseInt(Math.floor(Math.log(max))) + 1
    numOfGuess = 1;
    returnResult.innerHTML = ""
    remaining.innerHTML = `${6 - numOfGuess} `;
    getInputValue.removeAttribute('disabled');
    //startOver.removeChild(p);  
    playGame = true;
    document.getElementById('resultHistory').innerHTML = "";
    restartBtn.hide();
    document.getElementById("myrange").disabled = false;
    document.getElementById("myrange").value = 100;
    document.getElementById("valBox").innerHTML = "100"
    remaining.innerHTML = `5`;
}


//Key Press Code

document.onkeypress = keyPress;

function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        sub.click();
    }
}


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


function getRandom(_min , _max){
    document.getElementById("randBox").innerHTML = `<span>${rand}<span>`;
    return parseInt(Math.random() * _max)
}

function _disable(){
   
    document.getElementById("myrange").disabled = true;
    console.log("Range is Disabled")

}


