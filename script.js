var playerTurn = true;
var gameOngoing = true;
var extraTurnOn = false;

const clickAudio = new Audio("assets/buttonClick.mp3");
const quack = new Audio("assets/quack.mp3");

const totalPlayerHealth = 10;
const totalEnemyHealth = 20;
var playerTowerHealth = totalPlayerHealth;
var enemyTowerHealth = totalEnemyHealth;

const atk = 3;
const def = 3;

var img = new Array();
img[0] = "assets/duckAttackCrt.png";
img[1] = "assets/duckDefendCrt.png";
img[2] = "assets/mouseAttackCrt.png";
img[3] = "assets/mouseDefendCrt.png";
img[5] = "assets/extraTurn2.png";
img[6] = "assets/duckDoubleAttack.png";
img[7] = "assets/duckDoubleDefend.png";

// Audio plays when a button (start and restart) is clicked
function buttonAudio() {
  clickAudio.play();
}

//when a tower loses all health, it is hidden, the result button is unhidden, and the image displaying the result is unhidden
function tower() {
  if (playerTowerHealth <= 0) {
    document.getElementById("playerTower").hidden = true;
    gameOngoing = false;
    document.getElementById("results").hidden = false;
    document.getElementById("youLost").hidden = false;
  }
  if (enemyTowerHealth <= 0) {
    document.getElementById("enemyTower").hidden = true;
    gameOngoing = false;
    document.getElementById("results").hidden = false;
    document.getElementById("youWon").hidden = false;
  }
}

// TYPES OF CARDS
function attack() {
  if (playerTurn) {
    enemyTowerHealth -= atk;
    document.getElementById("enemyHealth").innerHTML = enemyTowerHealth + "/" + totalEnemyHealth;
    console.log("player attacked enemy: " + enemyTowerHealth);
  }
  else {
    playerTowerHealth -= atk;
    document.getElementById("playerHealth").innerHTML = playerTowerHealth + "/" + totalPlayerHealth;
    console.log("enemy attacked player: " + playerTowerHealth);
  }
}

function defense() {
  if (playerTurn) {
    playerTowerHealth += def;
    document.getElementById("playerHealth").innerHTML = playerTowerHealth + "/" + totalPlayerHealth;
    console.log("player defended itself: " + playerTowerHealth);
  }
  else {
    enemyTowerHealth += def;
    document.getElementById("enemyHealth").innerHTML = enemyTowerHealth + "/" + totalEnemyHealth;
    console.log("enemy defended itself: " + enemyTowerHealth);
  }
}

function extraTurn() {
  playerTurn = true;
  extraTurnOn = true;
  console.log("player recieved an extra turn");
}

// PLAYING THE GAME
function enemyPlay() {
  var num = Math.floor(Math.random() * 10);
  if ((playerTurn === false) && gameOngoing) {
    if (num < 5) {
      document.getElementById("enemyPlay").src = img[2];
      attack();
    }
    else {
      defense();
      document.getElementById("enemyPlay").src = img[3];
    }
  }
  playerTurn = true;
}

// play function is called when player clicks on a card (called in game.html)
function play() {
  quack.play(); // plays audio when card is clicked
  var selectedCardIndex = event.target.id; // grabs id of the element (card) that triggered the play function

  // checks what class the card is and plays based on it
  if (playerTurn && gameOngoing) {
    var cardClass = event.target.className;
    if (document.getElementById(selectedCardIndex).classList.contains("attack")) {
      attack();
      playerTurn = false;
    }
    else if (document.getElementById(selectedCardIndex).classList.contains("defense")) {
      defense();
      playerTurn = false;
    }
    else if (document.getElementById(selectedCardIndex).classList.contains("extraTurn")) {
      extraTurn();
    }
    else if (document.getElementById(selectedCardIndex).classList.contains("attack2x")) {
      enemyTowerHealth -= (atk*2);
      document.getElementById("enemyHealth").innerHTML = enemyTowerHealth + "/" + totalEnemyHealth;
      playerTurn = false;
      console.log("player attacked enemy 2x: " + enemyTowerHealth);
    }
    else if (document.getElementById(selectedCardIndex).classList.contains("defense2x")) {
      playerTowerHealth += (def*2);
      document.getElementById("playerHealth").innerHTML = playerTowerHealth + "/" + totalPlayerHealth;
      playerTurn = false;
      console.log("player defended itself 2x: " + playerTowerHealth);
    }

    replaceImg();
    
    if (extraTurnOn === false) {
      enemyPlay();
    } 
    else if ((playerTurn == false) && extraTurnOn) {
      extraTurnOn = false;
      playerTurn = true;
    }
  }
  
  tower(); //check if tower has fallen
}

//generates a new card and replaces the image of card that has been clicked
function replaceImg() {
  var selectedCardIndex = event.target.id;
  document.getElementById(selectedCardIndex).classList.add("changeCards")
  var num = Math.random() * 10;

  if (num <= 1) {
    document.getElementById(selectedCardIndex).src = img[6];
    document.getElementById(selectedCardIndex).classList.remove("extraTurn", "defense", "attack", "defense2x");
    document.getElementById(selectedCardIndex).classList.add("attack2x");
  }
  else if (num > 1 && num <= 2) {
    document.getElementById(selectedCardIndex).src = img[7];
    document.getElementById(selectedCardIndex).classList.remove("extraTurn", "defense", "attack", "attack2x");
    document.getElementById(selectedCardIndex).classList.add("defense2x");
  }
  else if (num <= 4) {
    document.getElementById(selectedCardIndex).src = img[0];
    document.getElementById(selectedCardIndex).classList.remove("extraTurn", "defense", "defense2x", "attack2x");
    document.getElementById(selectedCardIndex).classList.add("attack");
  }
  else if (num > 4 && num <= 7) {   
    document.getElementById(selectedCardIndex).src = img[5];
    document.getElementById(selectedCardIndex).classList.remove("attack", "defense", "attack2x", "defense2x");
    document.getElementById(selectedCardIndex).classList.add("extraTurn");
  }
  else {
    document.getElementById(selectedCardIndex).src = img[1];
    document.getElementById(selectedCardIndex).classList.remove("attack", "extraTurn", "attack2x", "defense2x");
    document.getElementById(selectedCardIndex).classList.add("defense");
  } 
}