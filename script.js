$(document).ready(() => {
  
let dealerCards = [];
let yourCards= [];
let dealerAceCount;
let yourAceCount;
let randInt;
let randInt2;
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let suits = ["C", "D", "H", "S"];
let deck = [];

function createDeck() {
deck = [];
// Create array with each suit-value pairing
for (let i = 0; i < suits.length; i++) {
  for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]);
      }
    }

// shuffle 3 times
for (let t = 0; t < 3; t++) {
for (let z = 0; z < deck.length; z++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[z];
        deck[z] = deck[j];
        deck[j] = temp;
    }
  }

console.log(deck);
}

createDeck();

let hitCard;
let yourSum;
let dealerSum;
let currentBet = 10;
let chipValue;
let money = 1000;
  
$("#money_count").html("Balance: " + money + " Albinbucks");
$("#current_bet").html("Current Bet: " + currentBet + " Albinbucks");

$(".chip").click((event) => {
  
  chipValue = $(event.target).attr('id');
  if(chipValue == "allIn") {
    currentBet += money;
    money = 0;
    $("#money_count").html("Balance: " + money + " Albinbucks");
    $("#current_bet").html("Current Bet: " + currentBet + " Albinbucks");
  }
  else if ((money - chipValue) >= 0) {
   currentBet += parseInt(chipValue);
   money -= parseInt(chipValue);
   $("#money_count").html("Balance: " + money + " Albinbucks");
   $("#current_bet").html("Current Bet: " + currentBet + " Albinbucks");
  }
  else {
    alert("broke");
  }
  
   });
  
function calculateSums() {
  dealerSum = 0;
  yourSum = 0;
  dealerAceCount = 0;
  yourAceCount = 0;

  for (let i = 0; i < dealerCards.length; i++) {
    
   if (dealerCards[i][0] == "J" || dealerCards[i][0] == "Q" || dealerCards[i][0] == "K" || dealerCards[i].includes("10")) {
     dealerSum += 10;  
    }
   else if (dealerCards[i][0] == "A")  {
      dealerAceCount++;
   }
    else {
      dealerSum += parseInt(dealerCards[i][0]);
    }
    
    }

  for(let a = 0; a < dealerAceCount; a++) {
    
      if ((dealerSum + 11) > 21) {
       dealerSum += 1;
     }
      else {
       dealerSum += 11;
     }
    
  }

  for (let j = 0; j < yourCards.length; j++) {
    if (yourCards[j][0] == "J" || yourCards[j][0] == "Q" || yourCards[j][0] == "K" || yourCards[j].includes("10")) {
        yourSum += 10;
    }
    else if (yourCards[j][0] == "A")  {
     yourAceCount++;
   }
    else {
      yourSum += parseInt(yourCards[j][0]);
    }
  }

  for(let b = 0; b <yourAceCount; b++) {
    
      if ((yourSum + 11) > 21) {
       yourSum += 1;
     }
      else {
       yourSum += 11;
     }  
  }
  
}

function displayCards() {
  
 $("#hand").html("Your Cards: <img src='cards/" + yourCards[0] + ".png' alt='"+ yourCards[0] + "'>" + "<img src='cards/" + yourCards[1] + ".png' alt='"+ yourCards[1] + "'>" );
  
 $("#dealer_hand").html("Dealer Cards: <img src='cards/" + dealerCards[0] + ".png' alt='"+ dealerCards[0] + "'> <img src='cards/BACK.png' alt='hidden card' >");
  
}
  
function deal() {
  $("#hit").removeClass('hidden');
  $('#stay').removeClass('hidden');
  
  $('#play').addClass('hidden');
  $(".chip").addClass('hidden');


  for(i=0; i < 2; i++) {
    randInt = Math.floor(Math.random() * deck.length);
    yourCards.push(deck[randInt]);
    deck.splice(randInt, 1);
    
    randInt2 = Math.floor(Math.random() * deck.length);
    dealerCards.push(deck[randInt2]);
    deck.splice(randInt2, 1);
  }

  $("#hand").removeClass('hidden');
  $("#dealer_hand").removeClass('hidden');

  displayCards();
  calculateSums();
  if(yourSum == 11 || yourSum == 10) {
    $('#doubleDown').removeClass('hidden');
  }
}

$("#play").click(() => {
  deal();
   });
  
function stay() {
  
  calculateSums();
  $('#doubleDown').addClass('hidden');
  $("#hit").addClass('hidden');
  $('#stay').addClass('hidden');
  $("#dealer_hand").html("Dealer Cards: <img src='cards/" + dealerCards[0] + ".png' alt='"+ dealerCards[0] + "'> <img src='cards/" + dealerCards[1] + ".png' alt='hidden card' >");

  setTimeout(dealerHit, 800);
  
}

function dealerHit() {
  
  if (dealerSum >= 17) {
      setTimeout(resultCheck, 700);
  }
    
  else {
    
  let dealerHitCard = Math.floor(Math.random() * deck.length);
  dealerCards.push(deck[dealerHitCard]);
  deck.splice(dealerHitCard, 1);
    
  $("#dealer_hand").append("<img src='cards/" + dealerCards[dealerCards.length -1] + ".png' alt='"+ dealerCards[dealerCards.length - 1] + "'>" );

  calculateSums();
    
  if (dealerSum > 21) { 
    setTimeout(dealerBust, 800);
  }
  else {
  setTimeout(dealerHit, 800); 
  }
  }
}
$("#stay").click(() => {
  stay();
   });

function resultCheck() {

  if (dealerSum > 21) {
    dealerBust();
  }
    
  else if(yourSum > dealerSum) {
    dealerLoses();
  }
    
  else if(yourSum < dealerSum) {
    youLose();
  }
    
  else {
    tie();
  }
  
}

function hit() {
  $('#doubleDown').addClass('hidden');
  calculateSums();
  
  hitCard = Math.floor(Math.random() * deck.length);
  yourCards.push(deck[hitCard]);
  deck.splice(hitCard, 1);
  
  $("#hand").append("<img src='cards/" + yourCards[yourCards.length -1] + ".png' alt='"+ yourCards[yourCards.length - 1] + "'>" );

  calculateSums();
  
  if (yourSum > 21) {
    $('#hit').addClass('hidden');
    $('#stay').addClass('hidden');
    
    setTimeout(youBust, 800);
  }
}

  $("#hit").click(() => {
  hit();
   });

function doubleDown() {

 if(money - currentBet >= 10) {
  currentBet = currentBet * 2;
  money -= currentBet;
  $("#money_count").html("Balance: " + money + " Albinbucks");
  $("#current_bet").html("Current Bet: " + currentBet + " Albinbucks");
  hit();
  setTimeout(stay, 2000);
 }
  else {
    alert("too broke");
  }
}

$("#doubleDown").click(() => {
  doubleDown();
   });
  
function displayResult(result, over21) {
  
  if (over21 && result == "won") {
    $("#result").html("Dealer went over 21, You won " + currentBet + " Albinbucks");
  }
  else if (over21 && result == "lost") {
    $("#result").html("You went over 21, You lost " + currentBet + " Albinbucks");
  }
  else if(result=="tied") {
    $("#result").html("You Tied, keeping " + currentBet + " Albinbucks");
  }
  else {
    $("#result").html("You " + result + " " + currentBet + " Albinbucks");
  }
  $("#yourTotal").html("Your total: " + yourSum);
  $("#dealerTotal").html("Dealer total: " + dealerSum);
  $("#resultPopUp").removeClass("hidden");
  
}

$("#resultPopUp").click(() => {
    $("#resultPopUp").addClass("hidden");
    reset();
   });
  
function dealerLoses() {
  money += (2 * currentBet);
  displayResult("won", false); 
}

function dealerBust() {
  money += (2 * currentBet);
  displayResult("won", true); 
}
  
function youLose() {
  displayResult("lost", false); 
}
  
function youBust() {
  displayResult("lost", true); 
}

function tie() {
  money += currentBet;
  displayResult("tied", false); 
}

function reset() {
  createDeck();
  yourCards = [];
  dealerCards = [];
  money -= 10;
  currentBet = 10;
  $('#play').removeClass('hidden');
  $('.chip').removeClass('hidden');
  $("#hand").html("");
  $("#dealer_hand").html("");
  $("#hand").addClass('hidden');
  $("#dealer_hand").addClass('hidden');
  $("#money_count").html("Your Balance: " + money + " Albinbucks");
  $("#current_bet").html("Current Bet: " + currentBet + " Albinbucks");

  if (money <= 0) {
    alert("broke");
     window.close();
  }
}


});
