var position;
var turn =  'X';
var webBoard;
var players = {'X':0, 'O':0};
var player1;
var player2;
var singlePlayer;
var twoPlayer;
var mode = true;
var restart;
var eventMessage;
var winnerLine = [];

function setup() {
  canvas = createCanvas(400, 400).parent('boardParent');;
  canvas.style('border-radius', '10px');
  canvas.style('border-radius', '10px');
  canvas.style('box-shadow', '-10px 10px 20px 1px rgba(0, 0, 0, 0.3)');

  eventMessage = createElement('h1', 'NONE');
  eventMessage.style('background-color', '#636e72');
  eventMessage.style('width', '300px');
  eventMessage.style('border-radius', '20px');
  eventMessage.style('opacity', '0');

  eventMessage.position(0,  windowHeight/2);


  player1 = createElement('h3', 'X-SCORE: 0');
  player2 = createElement('h3', 'O-SCORE: 0');
  player1.parent('scoreBoard');
  player2.parent('scoreBoard');

  singlePlayer = createButton('Play With AI').parent('scoreBoard');
  singlePlayer.style('background-color','rgba(0, 0, 0, 0.5');
  twoPlayer = createButton('Human vs Human').parent('scoreBoard');

  restart = createButton('Restart Game').parent('scoreBoard');
  restart.style('margin-left', '100px')
  singlePlayer.mousePressed(AImode);
  twoPlayer.mousePressed(twoPlayerMode);
  restart.mousePressed(restartGame);

  player1.style('width', '100px');	
  player1.style('padding', '2px');
  player1.style('padding-left', '10px');
  player1.style('background-color', 'rgba(0, 0, 0, 0.2)');
  player1.style('border-left', '5px solid rgba(0, 0, 0, 0.6)');

  player2.style('width', '100px');	
  player2.style('padding', '2px');
  player2.style('padding-left', '10px');

  noLoop();
}


function draw() {
  webBoard = new Board();

}

// Shows the message for the Win and for the tie
function showMessage(txt){
	eventMessage.style('transition', '.5s');
	eventMessage.html(txt);
  	eventMessage.position(windowWidth/2-150, windowHeight/2);
  	eventMessage.style('opacity', '1');
	setTimeout(()=>{
		 eventMessage.style('opacity', '0');
		 eventMessage.position(0, windowHeight/2);
	}, 1000);
 	
}

// Function for AI mode
function AImode(){
	mode = true;
	singlePlayer.style('background-color','rgba(0, 0, 0, 0.5');
	twoPlayer.style('background-color','rgba(0, 0, 0, 0');
}

// Function for two player mode
function twoPlayerMode(){
	mode = false;
	twoPlayer.style('background-color','rgba(0, 0, 0, 0.5)');
	singlePlayer.style('background-color','rgba(0, 0, 0, 0)');
}

function restartGame(){
	players = {'X':0, 'O':0};
	turn =  'X';
	player1.html('X-SCORE: 0');
	player2.html('O-SCORE: 0');
	player1.style('background-color', 'rgba(0, 0, 0, 0.2)');
  	player1.style('border-left', '5px solid rgba(0, 0, 0, 0.6)');
	clearBoard();
}

// returns the next turn
function nextTurn(currentTurn){
	if (currentTurn == 'X'){
		return 'O';
	}
	else{
		return 'X';
	}
}


// Marks the current turn
function setTurn(currentTurn){
	// Executes after the turn
	if (currentTurn == 'X'){
		player1.style('background-color', 'transparent');
  		player1.style('border-left', '0px solid rgba(0, 0, 0, 0)');

  		player2.style('background-color', 'rgba(0, 0, 0, 0.2)');
  		player2.style('border-left', '5px solid rgba(0, 0, 0, 0.6)');
	}
	else{
		player1.style('background-color', 'rgba(0, 0, 0, 0.2)');
		player1.style('border-left', '5px solid rgba(0, 0, 0, 0.6)');

		player2.style('background-color', 'transparent');
  		player2.style('border-left', '0px solid rgba(0, 0, 0, 0)');
	}
}



// check if the slot if a valid slot
function isValid(board, position){
	x = position[0];
	y = position[1];
	if(board[x][y] == ''){
		return true;
	}
	else{
		return false;
	}
}


// Check if the board is full
function isFull(board){
	let notFreeSlots = 0;

	for(let row = 0; row < board.length; row++){
		for(let col = 0; col < board.length; col++){
			if(board[row][col] != ''){
				notFreeSlots+=1;
			}
		}
	}
	if(notFreeSlots == board.length*board.length){
		return true;
	}
	else{
		return false;
	}
}

// Check if the slots are equals for the checkWin function
function isEquals(slot1, slot2, slot3){
	return (slot1 == slot2 && slot2 == slot3 && slot3 == slot1)  && (slot1 != '' || slot2 != '' || slot3 != '');
}

// Clears the board if we have either a tie or winner.
function clearBoard(){		
	for(let row = 0; row < webBoard.board.length; row++){
		for(let col = 0; col < webBoard.board.length; col++){
			webBoard.board[row][col] = '';
		}
	}
	turn = 'X';
	winnerLine = [];
	player1.style('background-color', 'rgba(0, 0, 0, 0.2)');
	player1.style('border-left', '5px solid rgba(0, 0, 0, 0.6)');

	clear();
	draw();
}

// Check for win
function checkWin(board){
	let winner = null;

	for(let row = 0; row < board.length; row++){
		if(isEquals(board[row][0], board[row][1], board[row][2])){
			return board[row][0];
		}
	}

	for(let col = 0; col < board.length; col++){
		if(isEquals(board[0][col], board[1][col], board[2][col])){
			return board[0][col];
		}
	}
	
	if(isEquals(board[0][0], board[1][1], board[2][2])){
		return board[0][0];	
	}
	else if(isEquals(board[0][2], board[1][1], board[2][0])){
		return board[0][2];
	}
	else if(isFull(board)){
		return 'tie';
	}
	else{
		return winner;
	}
}


// this is like the checkWin function but instead this function search for the start and end position for the winner line.
function checkPoints(board){

	for(let row = 0; row < board.length; row++){
		if(isEquals(board[row][0], board[row][1], board[row][2])){
			console.log('Appending..');
			winnerLine.push([row, 0]);
			winnerLine.push([row, 2]);
		}
	}

	for(let col = 0; col < board.length; col++){
		if(isEquals(board[0][col], board[1][col], board[2][col])){
			console.log('Appending..');
			winnerLine.push([0, col]);
			winnerLine.push([2, col]);
		}
	}
	
	if(isEquals(board[0][0], board[1][1], board[2][2])){
		console.log('Appending..');
		winnerLine.push([0, 0]);
		winnerLine.push([2, 2]);
	}
	else if(isEquals(board[0][2], board[1][1], board[2][0])){
		console.log('Appending..');
		winnerLine.push([0, 2]);
		winnerLine.push([2, 0]);
	}
}


// Check if it's the human player turn
function isMyTurn(turn){
	if(turn == 'X'){
		return true;
	}
	else{
		return false;
	}
}

// Executes the process for the AI's turn
function aiTurn(){
	let bestScore = -Infinity;
	let x = null;
	let y = null;
	for(let row = 0; row < webBoard.board.length; row++){
		for(let col = 0; col < webBoard.board.length; col++){
			if(webBoard.board[row][col] == ''){
				webBoard.board[row][col] = turn;
				let score =  miniMax(10 , nextTurn(turn), webBoard.board, true);
				webBoard.board[row][col] = '';
				if(score > bestScore)
				{
					bestScore = score;
					x = row;
					y = col;
				}
			}
		}
	}
	if(!isFull(webBoard.board))
	{
		webBoard.board[x][y] = turn;
		webBoard.drawTurn(turn, [x, y]);
		setTurn(turn);
		turn = nextTurn(turn);
	}
	
}


// Algorithm for Ai
function miniMax(depth, turn, board, isMaximizing, alpha, beta){
	let list = {'tie': 1, 'X': -2, 'O': 2, 'null': 0};
	let winner = str(checkWin(board));
	if(winner != 'null' || depth == 0){
		return list[winner]; 
	}

	if(isMaximizing){
		let bestScore = Infinity;
		for(let row = 0; row < board.length; row++){
			for(let col = 0; col < board.length; col++){
				if(board[row][col] == ''){

					board[row][col] = turn;
					let score =  miniMax(depth-1, nextTurn(turn), board, false, alpha, beta);
					board[row][col] = '';

					bestScore = min(score ,bestScore);
					beta = min(score, bestScore);
					if (alpha <= beta){
						break;
					}
				}
			}
		}
		return bestScore;
	}
	else{
		let bestScore = -Infinity;
		for(let row = 0; row < webBoard.board.length; row++){
			for(let col = 0; col < webBoard.board.length; col++){
				if(board[row][col] == ''){

					board[row][col] = turn;
					let score =  miniMax(depth-1, nextTurn(turn), board, true, alpha, beta);
					board[row][col] = '';
					
					bestScore = max(score ,bestScore);
					alpha = max(score, bestScore);
					if (beta <= alpha){
						break;
					}
				}
			}
		}
		return bestScore;
	}
}


// For mouse event and for checking of the position on board
function mouseClicked(){
	if((mouseX >= 0 && mouseX <= 127) && (mouseY >= 0 && mouseY <= 127)) {
		position = [0, 0];
	}
	else if((mouseX >= 140 && mouseX <= 260) && (mouseY >= 0 && mouseY <= 127))
	{
		position = [0, 1];
	}
	else if((mouseX >= 272 && mouseX <= 400) && (mouseY >= 0 && mouseY <= 127))
	{
		position = [0, 2];
	}
	// this is for the second row
	else if((mouseX >= 0 && mouseX <= 127) && (mouseY >= 140 && mouseY <= 260)){
		position = [1, 0];
	}
	else if((mouseX >= 140 && mouseX <= 260) && (mouseY >= 140 && mouseY <= 260)){
		position = [1, 1];
	}
	else if((mouseX >= 273 && mouseX <= 400) && (mouseY >= 138 && mouseY <= 260)){
		position = [1, 2];
	}
	// this is for the third row
	else if((mouseX >= 0 && mouseX <= 127) && (mouseY >= 272 && mouseY <= 400)){
		position = [2, 0];
	}
	else if((mouseX >= 139 && mouseX <= 260) && (mouseY >= 272 && mouseY <= 400)){
		position = [2, 1];
	}
	else if((mouseX >= 273 && mouseX <= 400) && (mouseY >= 272 && mouseY <= 400)){
		position = [2, 2];
	}


	if(position != null){
		//console.log(webBoard.board);
		if(isValid(webBoard.board, position)){
		  	webBoard.drawTurn(turn, position);
		  	setTurn(turn);
		  	turn = nextTurn(turn);
		  	
		  	if(mode){
		  		aiTurn();	
		  	}
		  	position = null;
	  	}
 	 }

 	winner = checkWin(webBoard.board);
 	
 	if(winner != null && winner != 'tie')
 	{
 		players[winner] += 1;
 		if(winner == 'X')
 		{
 			player1.html('X-SCORE: '+str(players[winner]));
 		}
 		else{
 			player2.html('O-SCORE: '+str(players[winner]));
 		}
 		checkPoints(webBoard.board);
 		console.log(winnerLine);
 		webBoard.drawWinLine(winnerLine[0], winnerLine[1]);
 		showMessage('The winner is : '+winner);
 		setTimeout(clearBoard, 1000);
 	}
 	else if(winner == 'tie'){
 		showMessage('it\'s a tie');
 		clearBoard();
 	}
}


