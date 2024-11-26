'use strict'

const GHOST = ''

// const GHOST = '<img src="img/pngegg.png" style="width: 100px; height: 100px;">'
// const BLUE_GHOST = '<img src="img/blue-ghost2.png" style="width: 30px; height: 30px;">'
var gGhosts = []
var gEatenGhosts = []
var gColorGhosts = createColorGhosts()
var gSuperFoodGhosts = createSuperFoodGhosts()
var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: gColorGhosts[getRandomInt(0, gColorGhosts.length)].str
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (ghost.currCellContent === PACMAN) alert('pacy')
    // DONE: return if cannot move
    // if (nextCell === WALL) return
    // if (nextCell === GHOST) return
    // if (nextCell === SUPERFOOD) return
    if ((nextCell === PACMAN && gPacman.isSuper) ||
        nextCell === WALL || nextCell === GHOST ||
        nextCell === SUPERFOOD) {
        renderCell(ghost.location, getGhostHTML(ghost))
        return
    }

    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        gameOver()
        return
    }

    if (ghost.currCellContent === PACMAN) alert('pacy')
    // DONE: moving from current location:
    // DONE: update the model 
    // if (ghost.currCellC?ontent !== GHOST)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    // DONE: Move the ghost to new location:
    // DONE: update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    var ghostColor = gPacman.isSuper ? gSuperFoodGhosts[getRandomInt(0, gSuperFoodGhosts.length)].str : ghost.color
    return ghostColor

    // return `<span><img src="img/blue-ghost2.png" style="width: 30px; height: 30px;"></span>`;
}

function createColorGhosts() {
    return [
        { id: 'ghost-green', str: `<img src="img/ghost-green.png" class="ghost">` },
        { id: 'ghost-lightblue', str: `<img src="img/ghost-lightblue.png" class="ghost">` },
        { id: 'ghost-pink', str: `<img src="img/ghost-pink.png" class="ghost">` },
        { id: 'ghost-red1', str: `<img src="img/ghost-red1.png" class="ghost">` },
        { id: 'ghost-red2', str: `<img src="img/ghost-red2.png" class="ghost">` },
        { id: 'ghost-blue', str: `<img src="img/ghost-blue.png" class="ghost">` },
        { id: 'ghost-white2', str: `<img src="img/ghost-white2.png" class="ghost">` },
        { id: 'ghost-gray', str: `<img src="img/ghost-gray.png" class="ghost">` },
        { id: 'ghost-ghost-candy', str: `<img src="img/ghost-candy.png" class="ghost">` },
        { id: 'ghost-ghost-cowboy', str: `<img src="img/ghost-cowboy.png" class="ghost cowboy">` },
        { id: 'ghost-ghost-orange', str: `<img src="img/ghost-orange.png" class="ghost">` },
        { id: 'ghost-yellow2', str: `<img src="img/ghost-yellow2.png" class="ghost">` }
    ]
}

function createSuperFoodGhosts() {
    return [
        // { id: 'ghost-super2' , str: `<img src="img/ghost-super2.png" class="ghost">`},
        { id: 'ghost-super', str: `<img src="img/ghost-super.png" class="ghost">` }
    ]
}