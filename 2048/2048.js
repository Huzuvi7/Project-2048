var board;
var score =0;
var rows = 4;
var columns =4;

window.onload = function(){
  setGame();
}

function setGame() {
  board= [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ]

  for (let r=0; r<rows; r++) {
    for(let c=0; c<columns; c++) {
      let tile= document.createElement("div");
      tile.id= r.toString()+"-"+c.toString();
      let num=board[r][c];
      updateTile(tile,num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile(){
  for (let r=0;r<rows;r++){
    if (board[r][0]==0){
      return true;
    }
  }
}
function setTwo(){
  if(!hasEmptyTile()){
    return;
  }
  let found=false;
  while(!found){
    let r=Math.floor(Math.random()*rows);
    let c=Math.floor(Math.random()*columns);
    
    if (board[r][c]==0){
      board[r][c]=2;
      let tile = document.getElementById(r.toString()+"-"+c.toString());
      tile.innerText="2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num){
  tile.innerText="";
  tile.classList.value="";
  tile.classList.add("tile");
  if(num>0){
    tile.innerText=num;
    if(num<=4096){
      tile.classList.add("x"+num.toString());
    } else{
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener('keyup',(e) => {
  if (e.code =="ArrowLeft"){
    slideLeft();
    setTwo();
    checkFor2048Tile();
    updateHighScore(score);

  }

  else if (e.code =="ArrowRight"){
    slideRight();
    setTwo();
    checkFor2048Tile();
    updateHighScore(score);
  }
  else if (e.code =="ArrowUp")
  { slideUp();
    setTwo();
    checkFor2048Tile();
    updateHighScore(score);
  }
  else if (e.code =="ArrowDown")
  { slideDown();
    setTwo();
    checkFor2048Tile();
    updateHighScore(score);
  }
  document.getElementById("score").innerText = score; 

  if (isGameOver()) {
    // Display a game over message to the user
    alert("Game Over! No more valid moves. Please reload the page, to play the game");
    window.onload = function(){
      setGame();
    }
  }

});

function filterZero(row) {
  return row.filter(num=>num!=0);
}

function slide(row){
  row= filterZero(row);
  
  for(let i=0;i<row.length-1;i++){
    if(row[i]==row[i+1]){
      row[i]*=2;
      row[i+1]=0;
      score+=row[i];
    }  
  }
  row=filterZero(row);
  
  while(row.length<columns){
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for(var r=0; r<rows; r++) {
    let row=board[r];
    row=slide(row);
    board[r]=row;
    
    for(let c=0; c<columns; c++) {
      let tile=document.getElementById(r.toString()+"-"+c.toString());
      let num=board[r][c];
      updateTile(tile,num);
      //const tileElement = document.getElementById(r.toString()+"-"+c.toString());
      //tileElement.classList.add('tile-merged');
    }
  }
}

function slideRight() {
  for(var r=0; r<rows; r++) {
    let row=board[r];
    row.reverse();
    row=slide(row);
    row.reverse();
    board[r]=row;

    for(let c=0; c<columns; c++) {
      let tile=document.getElementById(r.toString()+"-"+c.toString());
      let num=board[r][c];
      updateTile(tile,num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      row = slide(row);
      // board[0][c] = row[0];
      // board[1][c] = row[1];
      // board[2][c] = row[2];
      // board[3][c] = row[3];
      for (let r = 0; r < rows; r++){
          board[r][c] = row[r];
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
      }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
      let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
      row.reverse();
      row = slide(row);
      row.reverse();
      // board[0][c] = row[0];
      // board[1][c] = row[1];
      // board[2][c] = row[2];
      // board[3][c] = row[3];
      for (let r = 0; r < rows; r++){
          board[r][c] = row[r];
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
      }
  }
}

function isGameOver() {
  // Loop through the board and check if there are any adjacent tiles with the same value
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const currentTile = board[row][col];

      // Check if there is an empty cell
      if (currentTile === 0) {
        return false;
      }

      // Check if there are any adjacent tiles with the same value
      if (
        (row < 3 && currentTile === board[row + 1][col]) ||
        (col < 3 && currentTile === board[row][col + 1])
      ) {
        return false;
      }
    }
  }

  // If no valid moves are found, the game is over
  return true;
}

function checkFor2048Tile() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 2048) {
        // Display a "You Win" message using CSS
        const winMessage = document.getElementById('win-message');
        winMessage.style.display = 'block';
        return;
      }
    }
  }
}

function tilesMerged(board, row, col) {
  const currentValue = board[row][col];
  
  // Check if the current tile has a non-zero value (not an empty tile)
  if (currentValue !== 0) {
    // Check if the tile to the right has the same value
    if (col < board[row].length - 1 && currentValue === board[row][col + 1]) {
      return true;
    }
    // Check if the tile below has the same value
    if (row < board.length - 1 && currentValue === board[row + 1][col]) {
      return true;
    }
  }
  
  // If no merging condition is met, return false
  return false;
}

// Get the high score from localStorage if it exists, or set it to 0
let highScore = localStorage.getItem('highScore');
document.getElementById('highScore').textContent = highScore;
// Function to update and display high score
function updateHighScore(score) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
    document.getElementById('highScore').textContent = highScore;
  }
}

// Your game logic here...
// Update this function where the game score is calculated
function updateScore(newScore) {
  // Update the game score display
  // For example: document.getElementById('score').textContent = newScore;

  // Call the function to update high score
  updateHighScore(newScore);
}
