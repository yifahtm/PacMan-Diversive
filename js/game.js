'use strict'

const WALL = `<img src="img/brick2.png" style="width: 50px; height: 50px class="brick">`  //  🧱 🟨
const FOOD = '<img src="img/food.png" style="width: 15px; height: 15px;">' //• '•'
const SUPERFOOD = `<span style="font-size: 40px;">💉</span>`
const EMPTY = ' '
const CHERRY = '🍒'

const ADD_CHERRY_FREQ = 15000
// Model
const gGame = {
    score: 0,
    isOn: false,
    isVictory: false,
}
var gBoard
var gCherryInterval
var gFood

function onInit() {
    updateScore(0)

    gBoard = buildBoard()
    gFood = countFoodOnBoard()
    createGhosts(gBoard)
    createPacman(gBoard)

    renderBoard(gBoard)

    startCherryInterval()
    gGame.isOn = true
    // moveGhosts()
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gFood++

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = board[1][size - 2] = board[size - 2][1] = board[size - 2][size - 2] = SUPERFOOD
    gFood -= 4
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    renderCell(gPacman.location, '☠️')
    gGame.isOn = false
    gGame.isVictory = false
    showModal()
}

function startCherryInterval() {
    gCherryInterval = setInterval(() => {
        addCherry()
    }, ADD_CHERRY_FREQ);
}

function addCherry() {
    const emptyPos = getEmptyRndPosCherry()
    if (!emptyPos) return

    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
}

function getEmptyRndPosCherry() {
    var emptyPos = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell === EMPTY) {
                emptyPos.push({ i: i, j: j })
            }
        }
    }
    var randIdx = getRandomInt(0, emptyPos.length)
    return emptyPos[randIdx]
}

function Victorious() {
    gGame.isVictory = true
    showModal()
}

function countFoodOnBoard() {
    var count = 0
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD) {
                count++
            }
        }
    }
    return count
}

function onPlayAgain() {
    onInit()
    hideModal()
}

function showModal() {

    const elModal = document.querySelector('.modal')
    const elModalMsg = elModal.querySelector('.modal .res-message')
    elModal.classList.remove('hidden')

    if (gGame.isVictory) elModalMsg.innerText = 'Victorious!'

    if (!gGame.isVictory) elModalMsg.innerText = 'Game Over!'

}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
}