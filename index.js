const sq1El = document.querySelector('#square-1')
const sq2El = document.querySelector('#square-2')
const sq3El = document.querySelector('#square-3')
const sq4El = document.querySelector('#square-4')
const sq5El = document.querySelector('#square-5')
const sq6El = document.querySelector('#square-6')
const sq7El = document.querySelector('#square-7')
const sq8El = document.querySelector('#square-8')
const sq9El = document.querySelector('#square-9')


const score = {
  human:0,
  computer:0
}
function getWinOption(player) {
  let winOption

  for(let i =0; i<winCombos.length-1;i++){
    let combo = winCombos[i]
    let optionsLeft = combo.filter(sq=>boardState[sq]===player)

    if(optionsLeft.length===2){
      const option =  combo.find(sq=>!boardState[sq])
      if(option){
        winOption= option
        break
      }
    }
  }

  return winOption
}




const winCombos =   [
    [1,2,3],
    [1,5,9],
    [1,4,7],
    [2,5,8],
    [3,5,7],
    [3,6,9],
    [4,5,6],
    [7,8,9],
    ]

let isHumanTurn = randomStart()


const boardState ={
  1:'',
  2:'',
  3:'',
  4:'',
  5:'',
  6:'',
  7:'',
  8:'',
  9:'',
}
const squares = [sq1El,sq2El,sq3El,sq4El,sq5El,sq6El,sq7El,sq8El,sq9El]


function randomStart(){return Math.random()<=.4999999}

const computerSelection = ()=>{

  const options =  Object.keys(boardState).filter(square=>!boardState[square])
// first consideration: do I have a win combo? and if square is empty string, then select that
// if human has an almost win combo, then choose the square to stop human winning
//
  let optionSelected = getWinOption("computer")

  if(!optionSelected){
    optionSelected = getWinOption("human")
  }


  if(!optionSelected){
    optionSelected =options[Math.floor(Math.random()*options.length)]
  }


  boardState[optionSelected]='computer'
  drawBoard()
  determineWinner()
}
//
// const computerSelection = ()=>{
//   const options =  Object.keys(boardState).filter(square=>!boardState[square])
//   const optionSelected = options[Math.floor(Math.random()*options.length)]
//   boardState[optionSelected]='computer'
//   drawBoard()
//   determineWinner()
// }


if(!isHumanTurn)computerSelection()


const clickedSquare = (index)=>{
  if(!boardState[index]){
    makeSelection(index)
  }
}

const makeSelection = (index)=>{
  boardState[index] =isHumanTurn? "human":'computer'
   drawBoard()
   determineWinner()
}

squares.forEach((square,index)=>{
  square.addEventListener('click',()=>{
    clickedSquare(index+1)
  })
})


function determineWinner(){
  const currentTurn = isHumanTurn? 'human':'computer'
    const hasWon= !!winCombos.find(combo=>{
    return combo.every(square=>{
      return boardState[square] ===currentTurn
    })
  })

  if(hasWon){
    updateScore(currentTurn)
    clearBoard()
    return
  }
  const isTie = Object.keys(boardState).every(sq=> boardState[sq])
if(isTie){
  return clearBoard()
}
    isHumanTurn = !isHumanTurn
    if(!isHumanTurn)computerSelection()
}

function clearBoard(){
Object.keys(boardState).forEach(sq=> boardState[sq]='')
  drawBoard()
  isHumanTurn = randomStart()
  if(!isHumanTurn)computerSelection()

}

function updateScore(winner){
    score[winner]+=1
    document.querySelector(`#${winner}-score span`).innerHTML= score[winner]
}

function drawBoard(){
  squares.forEach((squareElement,index)=>{
    if(boardState[index+1]==='human'){
      squareElement.style.background="green"
      return
    }

    if(boardState[index+1]==='computer'){
      squareElement.style.background="red"
      return
    }

    squareElement.style.background="cyan"
  })

}
