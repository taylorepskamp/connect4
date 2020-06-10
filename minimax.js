let timePenalty = 0.1;

columns = [3, 4, 2, 5, 1, 6, 0]

let scores = {
  'You': -1,
  'Bot': 1,
  'Tie': 0
}


function aiMove() {
  if(random == true){
   aiMoveTest() 
  }
  else{
  //we set AI as O in set up
  //AI finds all possibilities and selects best
  let bestScore = -100
  let move;

  let freeSpot = []
  for (let ind = 0; ind < 7; ind++) {
    horz = columns[ind]
    for (let vert = 5; vert > -1; vert--) {
      if (board[vert][horz] == '') {
        freeSpot.push({vert,horz})
        break
      }
    }
  }
  for (let i = 0; i < freeSpot.length; i++) {
    let horz = freeSpot[i].horz
    let vert = freeSpot[i].vert
    board[vert][horz] = ai
    //calls minimax
    let score = minimax(board, 0, false);
    board[vert][horz] = ''
    if (score > bestScore) {
      bestScore = score;
      move = {vert,horz}
    }
  }
  //set ai choice in board
  
  board[move.vert][move.horz] = ai
  let w = width / 7;
  let h = height / 6;
  let x = w * move.horz + w / 2;
  let y = h * move.vert + h / 2;
  count++
  fill('#FF6868')
  stroke('#024b87')
  strokeWeight(2);
  ellipse(x, y, w / 1.25)

  //switch currentplayer back to human
  currentPlayer = human
  }
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinner()
  if (result !== null) {
    return scores[result] 
  }
  if (depth > maxDepth){
    return 0
  }
  if (isMaximizing) {
    let bestScore = -100
    let freeSpot = []
  for (let ind = 0; ind < 7; ind++) {
    horz = columns[ind]
      for (let vert = 5; vert > -1; vert--) {
        if (board[vert][horz] == '') {
          freeSpot.push({vert,horz})
          break
        }
      }
    }
    for (let i = 0; i < freeSpot.length; i++) {
      let horz = freeSpot[i].horz
      let vert = freeSpot[i].vert
      board[vert][horz] = ai
      //calls minimax
      let score = minimax(board, depth + 1, false);
      score = score - depth*timePenalty
      board[vert][horz] = ''
      if(Number.isNaN(score)){
        console.log("uh oh score -",score,"horz-",horz,"vert-",vert)
      }
      bestScore = max(score, bestScore)
    }
 
return bestScore;
  }

else {
  let bestScore = 100
  let freeSpot = []
  for (let ind = 0; ind < 7; ind++) {
    horz = columns[ind]
      for (let vert = 5; vert > -1; vert--) {
        if (board[vert][horz] == '') {
          freeSpot.push({vert,horz})
          break
        }
      }
    }
    for (let i = 0; i < freeSpot.length; i++) {
      let horz = freeSpot[i].horz
      let vert = freeSpot[i].vert
      board[vert][horz] = human
      //calls minimax
      let score = minimax(board, depth + 1, true);
      score = score + depth*timePenalty
      board[vert][horz] = ''
      if(Number.isNaN(score)){
        console.log(freeSpot.length)
        console.log("uh oh score -",score,"horz-",horz,"vert-",vert)
      }
      bestScore = min(score, bestScore)
    }
  
  return bestScore
}
}


function aiMoveTest() {
  let freeSpot = []

  for (let horz = 0; horz < 7; horz++) {
    for (let vert = 5; vert > -1; vert--) {
      if (board[vert][horz] == '') {
        freeSpot.push({
          vert,
          horz
        })
        break
      }
    }
  }
  let move = freeSpot[Math.floor(Math.random() * freeSpot.length)]
  //set ai choice in board
  board[move.vert][move.horz] = ai
  let w = width / 7;
  let h = height / 6;
  let x = w * move.horz + w / 2;
  let y = h * move.vert + h / 2;
  fill('#FF6868')
  stroke('#024b87')
  strokeWeight(2);
  ellipse(x, y, w / 1.25)
  //switch currentplayer back to human
  currentPlayer = human
}