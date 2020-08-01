
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.


  // 1) Step 1: Create Players
  
  var Player1={                                             //Payer1
    name: " ",
    shipCount:4,
    gameBoard: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
   
}

var Player2={                                               //Payer2
  name: " ",
  shipCount:4,
  gameBoard: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

}
Player1.name = prompt("Player 1 : Enter your Name"); //prompt the player1 name
Player2.name= prompt("Player 2 : Enter your Name");  //prompt the player2 name


var name1 = document.querySelector('#name_player1'); //Select the DoM element for player1
name1.textContent = JSON.stringify(Player1.name);    // set it content to the paler name
var name2 = document.querySelector('#name_player2');//Select the DoM element for player2
name2.textContent = JSON.stringify(Player2.name);   // set it content to the paler name

function shipBaordLoader(Player) {                         // function for loading a player information
  var randomCount=0;
  while(true){
    var randomX=Math.floor(Math.random()*4);
    var randomY=Math.floor(Math.random()*4);
    if(parseInt(Player.gameBoard[randomX][randomY])!==1){
        Player.gameBoard[randomX][randomY]=1;
        randomCount++;
        console.log(Player.name,randomX,randomY);
        if (randomCount ==4){
        break;
                }
        }
  }
  return Player.gameBoard;

}

shipBaordLoader(Player1);    // calling the function to laod Player1 information 
shipBaordLoader(Player2);   // calling the function to laod Player2 information 

var turn = document.querySelector("#turn_player"); //turn player
turn.innerHTML =  Player1.name;     //turn player name assignment (the player1 will start and it will change)
var P1live = document.querySelector(".player_information #ships_player1"); // get the class and the Id of ships_player1 and save it in var P1live
P1live.innerText = Player1.shipCount;        // set P1live inner HTML to   Player1.shipCount which is 4
var P2live = document.querySelector(".player_information #ships_player2"); // get the class and the Id of ships_player2 and save it P2live
P2live.innerText = Player2.shipCount;       // set P2live inner HTML to   Player2.shipCount which is 4

function checkWinning (){                 // function to check the Winner and display a winner message the the current player name
  var theWiner = document.querySelector(".winner");
if(parseInt(Player1.shipCount)== 0){
  var r = 1;
theWiner.innerHTML = "<h2><center> Congratulation "+Player2.name+" you win </center></h2>";
r++;
}else if (parseInt(Player2.shipCount)=== 0){
theWiner.innerHTML = "<h2><center> Congratulation "+Player1.name+" you win </center></h2>";
}
}
                                            

//
const board_Player1 = document.getElementById('board_player1');   // player 1 board 
const board_player2 = document.getElementById('board_player2');   // player 2 board 
const board_Player = ' ';
const Player = [];
const PlayerLive = '';
var DivCreated1 = [[],[],[],[]];
var DivCreated2 = [[],[],[],[]];

var currentPlayer = 'board_player1';
var opponentPlayer = 'board_player2';
function swapPlayer (){
  [currentPlayer,opponentPlayer] = [opponentPlayer, currentPlayer];
}
function GameForPlayer(board_Player,Player,PlayerLive){
for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
  
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');

      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      var val = Player.gameBoard[x][y];  // value of each matrix element in the gameBoard
      cell.value = val;//state of the cell
      
     
      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
        e.preventDefault();
          let cell = e.target; // get the element clicked
          var idBoard = cell.parentElement.parentElement.id;
  
          console.log( cell.textContent) //display the coordinates in the console
          //cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
         
         // cell.textContent = cell.value;  // assign the value of each matrix element in the gameBoard to the eqivalent cell.textcontent
          turn.innerHTML = Player.name; //swicth the turn to Player1
          if(currentPlayer === idBoard){
            console.log("test"+cell.textContent);
            if(parseInt(cell.value)===1 && cell.style.background !=="purple"){
              Player.shipCount--;
              PlayerLive.innerText = Player.shipCount;
              cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
               
            }  swapPlayer();
            checkWinning();
          }
      });
      
     
      li.appendChild(cell); //adding each cell into the row number x
    }

    board_Player.appendChild(li); //adding each row into the board
}

}

GameForPlayer(board_Player1,Player1,P1live);
GameForPlayer(board_player2,Player2,P2live);
  
var reset = document.createElement('BUTTON');    // creating a button for the reset
reset.id = 'Reset';                            
reset.innerHTML = "Reset";

var NewGame = document.createElement('BUTTON'); // creating a button for the new game 
NewGame.id = 'NewGame';
NewGame.innerHTML = "New Game";

document.getElementById('buttons').appendChild(reset);      // append reset as a child of the element with the Id buttons
document.getElementById('buttons').appendChild(NewGame);     // append NewGame as a child of the element with the Id buttons

var getResetButon = document.getElementById('Reset');
getResetButon.addEventListener('click',()=>{            //reset click event  to reset the game  
  Player1.shipCount = 4;
  Player2.shipCount = 4;
 
  P2live.innerText =  Player2.shipCount;
  P1live.innerText =  Player2.shipCount;
  var getSquare = document.querySelectorAll(".square");
   for(var i = 0; i<getSquare.length; i++){
    getSquare[i].style.background = 'black';

   }
 
  
});

 var getNewGameButon = document.getElementById('NewGame');
 getNewGameButon.addEventListener('click',(e)=>{          // Renew click to restart  the game
  e.preventDefault();
  function refreshPage(){
		if(confirm("Are you sure you weant to start a new game?")){
			location.reload();
		}				
  }
  refreshPage();
  

});



