let board = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
];

let human = 'You'
let ai = 'Bot'

let aiChipImg;
let humanChipImg;

let currentPlayer;
let winner = null;
let count = 0;
let maxDepth = 2;

// To set the difficulty
let easy = false
let medium = true
let hard = false
let random = false



function setup() {
  
  //canvasWidth = min(windowWidth,800)
  //let cnv = createCanvas(canvasWidth, 450);
  let cnv = createCanvas( min(windowWidth/1.25, 525), 450);
  cnv.parent('gameBoard')
  //create board
  
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  //cnv.position(x, y);
  //cnv.style('border-radius', '10px');
  cnv.style('border', 'solid 10px #0174D5');
  
  let w = width / 7;
  let h = height / 6
  for (let horz = 0; horz < 7; horz++) {
    for (let vert = 0; vert < 6; vert++) {
      
      let x1 = w * horz + w / 2;
      let y1 = h * vert + h / 2;
       fill('#33383D')
       stroke('#319ef7')
       strokeWeight(3)
       ellipse(x1, y1, w / 1.12)
      }
  }
      
  

 // Toggles for the difficulty
  //easyH = windowHeight - 150
  //easyW = 140 
  //easyB = createButton('Easy')
  //easyB = document.getElementById('easyB')
  //easyB.style('color','black')
  //easyB.position(easyW,easyH)
  //medB = createButton('Medium')
  //medB.style('color','black')
  //medB.style('background-color', '#7ac3ff')
  //medB.position(easyW+70,easyH)
  //hardB = createButton('Hard')
 // hardB.style('color','black')
  //hardB.position(easyW+160,easyH)
  
  //easyB.mousePressed(goEasy)
 //medB.mousePressed(goMed)
  //hardB.mousePressed(goHard)
  goMed()
  frameRate(1)
  currentPlayer = human
  cnv.mouseClicked(humanMove)
  //aiMove()


}




function draw() {
  
  // set the difficulty based on the toggle
  if(easy == true){
    maxDepth = Math.floor(Math.random()*2)+1
  }
  else if(medium == true){
    maxDepth = 3
  }
  else if(hard == true){
    maxDepth =  min(Math.floor(count/8)+4,8)
  }
  
  //check every frame if a winner exists
  let result = checkWinner()
  //result will equal either X,O,Tie, or Null
  if (result !== null) {
    
    //end draw loop if not null aka there was a tie or a win
    noLoop()
    document.getElementById('reset').style.visibility = 'visible'
    if (result == 'Tie') {
      console.log('The game is a', result)
    } else {
      checkWinnerDraw(result)
      console.log('Winner is', result)
    }
  }
}

function humanMove() {
  let w = width / 7;
  let h = height / 6;

  if (currentPlayer == human && checkWinner() === null) {
    let horz = floor(mouseX / w)
    let vert = floor(mouseY / h)
    
    //ensure player only plays in lowest spot
    let maxVert = 0
    for (let vertTest = 0; vertTest < 6; vertTest++) {
      let spot = board[vertTest][horz];
      if(spot == ''){
        maxVert = vertTest
      }
    }
    //assign piece to player's click
    if (board[vert][horz] == '' && vert == maxVert) {
      board[vert][horz] = human
      let x = w * horz + w / 2;
      let y = h * vert + h / 2;
      count++
       console.log("turns -",count, "maxDepth -", maxDepth)
      
      fill('#FFFC82')
      stroke('#024b87')
      strokeWeight(2);
      ellipse(x, y, w / 1.25)
      //switch move to ai
      currentPlayer = ai
      if (checkWinner() == null) {
        aiMove()
      }
    }
  }
}



function equalCheck(a, b, c, d) {
  return (a == b && b == c && c == d && a != '')
}

function checkWinner() {
  let available = []
  let winner = null;
  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 6; i++) {
      if (board[i][j] == '') {
        available.push([i, j]);
      }
    }
  }
  //horizontal
  for (let vert = 0; vert < 6; vert++) {
    for (let horz = 0; horz < 4; horz++) {
      if (equalCheck(board[vert][horz], board[vert][horz + 1], board[vert][horz + 2], board[vert][horz + 3])) {
        winner = board[vert][horz]
      }
    }
  }
  //vertical
  for (let horz = 0; horz < 7; horz++) {
    for (let vert = 0; vert < 3; vert++) {
      if (equalCheck(board[vert][horz], board[vert + 1][horz], board[vert + 2][horz], board[vert + 3][horz])) {
        winner = board[vert][horz]
      }
    }
  }

  //diagonals
  for (let index = 0; index < 3; index++) {
    if (index < 2) {
      // up to the left
      if (equalCheck(board[index + 1][index], board[index + 2][index + 1], board[index + 3][index + 2], board[index + 4][index + 3])) {
        winner = board[index + 1][index]
      }
      if (equalCheck(board[index][index + 2], board[index + 1][index + 3], board[index + 2][index + 4], board[index + 3][index + 5])) {
        winner = board[index][index + 2]
      }
      // up to the right
      if (equalCheck(board[index][4 - index], board[index + 1][3 - index], board[index + 2][2 - index], board[index + 3][1 - index])) {
        winner = board[index][4 - index]
      }
      if (equalCheck(board[index + 1][6 - index], board[index + 2][5 - index], board[index + 3][4 - index], board[index + 4][3 - index])) {
        winner = board[index+1][6 - index]
      }
    }

    // up to the left
    if (equalCheck(board[index][index], board[index + 1][index + 1], board[index + 2][index + 2], board[index + 3][index + 3])) {
      winner = board[index][index]
    }
    if (equalCheck(board[index][index + 1], board[index + 1][index + 2], board[index + 2][index + 3], board[index + 3][index + 4])) {
      winner = board[index][index + 1]
    }
    //up to the right
    if (equalCheck(board[index][5 - index], board[index + 1][4 - index], board[index + 2][3 - index], board[index + 3][2 - index])) {
      winner = board[index][5 - index]
    }
    if (equalCheck(board[index][6 - index], board[index + 1][5 - index], board[index + 2][4 - index], board[index + 3][3 - index])) {
      winner = board[index][6 - index]
    }
  }

  // diagonals up to the left
  if (equalCheck(board[2][0], board[3][1], board[4][2], board[5][3])) {
    winner = board[2][0]
  }
  if (equalCheck(board[0][3], board[1][4], board[2][5], board[3][6])) {
    winner = board[0][3]
  }
  // diagonals up to the right
  if (equalCheck(board[0][3], board[1][2], board[2][1], board[3][0])) {
    winner = board[0][3]
  }
  if (equalCheck(board[2][6], board[3][5], board[4][4], board[5][3])) {
    winner = board[2][6]
  }
  // if all the spots are taken and no winners
  if (count == 42 && winner == null) {
    //console.log(available.length)
    winner = 'Tie'
  }
  return winner
}

function hello(){
  console.log("hello")
  
}

function goEasy(){
  if(count == 0){
    //easyB.style('background-color', '#7ac3ff')
    //medB.style('background-color', '#fff')
    //hardB.style('background-color', '#fff')
    document.getElementById('easyB').style.backgroundColor = '#0174D5';
    document.getElementById('medB').style.background = 'none';
    document.getElementById('hardB').style.background = 'none';
    easy = true
    medium = false
    hard = false
  }
}

function goMed(){
  if(count == 0){
    document.getElementById('easyB').style.background = 'none';
    document.getElementById('medB').style.backgroundColor = '#0174D5';
    document.getElementById('hardB').style.background = 'none';
    //medB.style('background-color', '#7ac3ff')
    //hardB.style('background-color', '#fff')
    easy = false
    medium = true
    hard = false
  }
}

function goHard(){
  if(count == 0){
    document.getElementById('easyB').style.background = 'none';
    document.getElementById('medB').style.background = 'none';
    document.getElementById('hardB').style.backgroundColor = '#0174D5';
    //hardB.style('background-color', '#7ac3ff')
    //medB.style('background-color', '#fff')
    //easyB.style('background-color', '#fff')
    easy = false
    medium = false
    hard = true
  }
}







function checkWinnerDraw(result) {
  let vert1 = 0
  let horz1 = 0
  let vert2 = 0
  let horz2 = 0
  
  //horizontal
  for (let vert = 0; vert < 6; vert++) {
    for (let horz = 0; horz < 4; horz++) {
      if (equalCheck(board[vert][horz], board[vert][horz + 1], board[vert][horz + 2], board[vert][horz + 3])) {
        vert1 = vert
        horz1 = horz
        vert2 = vert
        horz2 = horz+3
      }
    }
  }
  //vertical
  for (let horz = 0; horz < 7; horz++) {
    for (let vert = 0; vert < 3; vert++) {
      if (equalCheck(board[vert][horz], board[vert + 1][horz], board[vert + 2][horz], board[vert + 3][horz])) {
        vert1 = vert
        horz1 = horz
        vert2 = vert+3
        horz2 = horz
      }
    }
  }

  //diagonals
  for (let index = 0; index < 3; index++) {
    if (index < 2) {
      // up to the left
      if (equalCheck(board[index + 1][index], board[index + 2][index + 1], board[index + 3][index + 2], board[index + 4][index + 3])) {
        vert1 = index+1
        horz1 = index
        vert2 = index+4
        horz2 = index+3
      }
      if (equalCheck(board[index][index + 2], board[index + 1][index + 3], board[index + 2][index + 4], board[index + 3][index + 5])) {
        vert1 = index
        horz1 = index+2
        vert2 = index+3
        horz2 = index+5
      }
      // up to the right
      if (equalCheck(board[index][4 - index], board[index + 1][3 - index], board[index + 2][2 - index], board[index + 3][1 - index])) {
        vert1 = index
        horz1 = 4-index
        vert2 = index+3
        horz2 = 1-index
      }
      if (equalCheck(board[index + 1][6 - index], board[index + 2][5 - index], board[index + 3][4 - index], board[index + 4][3 - index])) {
        vert1 = index+1
        horz1 = 6-index
        vert2 = index+4
        horz2 = 3-index
      }
    }

    // up to the left
    if (equalCheck(board[index][index], board[index + 1][index + 1], board[index + 2][index + 2], board[index + 3][index + 3])) {
      vert1 = index
      horz1 = index
      vert2 = index+3
      horz2 = index+3
    }
    if (equalCheck(board[index][index + 1], board[index + 1][index + 2], board[index + 2][index + 3], board[index + 3][index + 4])) {
      vert1 = index
      horz1 = index+1
      vert2 = index+3
      horz2 = index +4
    }
    //up to the right
    if (equalCheck(board[index][5 - index], board[index + 1][4 - index], board[index + 2][3 - index], board[index + 3][2 - index])) {
      vert1 = index
      horz1 = 5-index
      vert2 = index+3
      horz2 = 2-index
    }
    if (equalCheck(board[index][6 - index], board[index + 1][5 - index], board[index + 2][4 - index], board[index + 3][3 - index])) {
      vert1 = index
      horz1 = 6-index
      vert2 = index+3
      horz2 = 3-index
    }
  }

  // diagonals up to the left
  if (equalCheck(board[2][0], board[3][1], board[4][2], board[5][3])) {
    vert1 = 2
    horz1 = 0
    vert2 = 5
    horz2 = 3
  }
  if (equalCheck(board[0][3], board[1][4], board[2][5], board[3][6])) {
    vert1 = 0
    horz1 = 3
    vert2 = 3
    horz2 = 6
  }
  // diagonals up to the right
  if (equalCheck(board[0][3], board[1][2], board[2][1], board[3][0])) {
    vert1 = 0
    horz1 = 3
    vert2 = 3
    horz2 = 0
  }
  if (equalCheck(board[2][6], board[3][5], board[4][4], board[5][3])) {
    vert1 = 2
    horz1 = 6
    vert2 = 5
    horz2 = 3
  }

  // calc where the line should start and stop
  let w = width / 7;
  let h = height / 6;
  
  let x1 = w * horz1 + w / 2;
  let y1 = h * vert1 + h / 2;
  let x2 = w * horz2 + w / 2;
  let y2 = h * vert2 + h / 2;
  
  stroke('#33383d')
  strokeWeight(8);
  line(x1, y1, x2, y2);
  // draw line
  if(result == 'You'){
    stroke('#FFFC82')
  }
  if (result == 'Bot'){
   stroke('#FF6868') 
  }
  strokeWeight(6);
  line(x1, y1, x2, y2);
  return 0
}

function restart(){
  goMed()
    board = [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
];
  winner = null;
  count = 0;
  maxDepth = 2;
  setup()
  document.getElementById('reset').style.visibility = 'hidden'
  loop()
}