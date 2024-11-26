'use strict'

// var PACMAN = '😀'
var PACMAN = `<img src="img/pacman2.gif" class="pacman">`
// const PACMAN = '<img src="img/pacman.png" style="width: 10px; height: 10px;">'
var gPacman
var gSuperTimeout = null
var Foody

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gFood--
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    if (nextCell === CHERRY) updateScore(10)

    if (nextCell === FOOD) {
        updateScore(1)
        gFood--
    }

    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper === true) return
        activateSuperMode()
    }

    // DONE: hitting a ghost? call 'gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {
            eatGhosts(nextLocation)
        }
        else {
            gameOver()
            return
        }
    }

    // if (nextCell === FOOD) updateScore(1)


    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)

    if (gFood === 0) victorious()
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    var className = ''

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            className = 'up'
            break;
        case 'ArrowRight':
            nextLocation.j++
            className = ''
            break;
        case 'ArrowDown':
            nextLocation.i++
            className = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            className = 'left'
            break;
    }
    PACMAN = `<img src="img/pacman2.gif" class="${className} pacman">`
    // PACMAN = `<span style="transform: rotate(180deg);">${PACMAN}</span>`
    return nextLocation
}

function eatGhosts(nextPos) {
    // gBoard[nextPos.i][nextPos.j] = EMPTY
    gBoard[nextPos.i][nextPos.j] = EMPTY
    for (var idx = 0; idx < gGhosts.length; idx++) {
        const ghost = gGhosts[idx]
        if (nextPos.i === ghost.location.i &&
            nextPos.j === ghost.location.j) {
            if (ghost.currCellContent === FOOD) gFood--
            ghost.currCellContent = EMPTY
            gEatenGhosts.push(gGhosts.splice(idx, 1)[0])
            console.log(gEatenGhosts.length)
            return
        }
        // gEatenGhosts.push(eatenGhost)
    }
}


function activateSuperMode() {
    gPacman.isSuper = true
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }
    if (!gSuperTimeout) {
        gSuperTimeout = setTimeout(() => {
            deactivateSuperMode()
        }, 5000)
    }
}

function deactivateSuperMode() {
    console.log('i am deactivating')
    if (gEatenGhosts.length >= 1) reviveEatenGhosts()
    gSuperTimeout = null
    gPacman.isSuper = false
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    }

}

function reviveEatenGhosts() {
    if (!gEatenGhosts) return

    //     for (var i = gEatenGhosts.length - 1 ; i >= 0; i--) {
    //         const eatenGhost = gEatenGhosts[i]
    //         const emptyPos = getEmptyRndPos()

    //         eatenGhost.location.i = emptyPos.i
    //         eatenGhost.location.j = emptyPos.j
    //         eatenGhost.currCellContent = gBoard[emptyPos.i][emptyPos.j] + ''
    // _
    //     }
    console.log('coococl')
    gGhosts = gGhosts.concat(gEatenGhosts)
    // for (var i = 0; i < gGhosts.length; i++) {
    //     renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]))
    // }
    gEatenGhosts = []
}

function getEmptyRndPos() {
    var emptyPos = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell !== WALL && currCell !== PACMAN && currCell !== SUPERFOOD) {
                emptyPos.push({ i: i, j: j })
                // console.log('found empty pos ',emptyPos[i])
            }
        }
    }
    if (!emptyPos) console.log('no empty cells found')
    var randIdx = getRandomInt(0, emptyPos.length)
    // console.log('the random index found is:',randIdx)
    var rndPos = emptyPos[randIdx]
    // console.log('found this empty cell',rndPos)
    return rndPos
}

function victorious() {

    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gGhosts = []
    // renderCell(gPacman.location, '☠️')
    gGame.isOn = false
    gGame.isVictory = true
    showModal()
}
