document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0

    //create a playing board
    function createBoard() {
        for (let i=0 ; i < width*width ; i++) {
            square = document.createElement('div')
            square.innerHTML = ''
            gridDisplay.appendChild(square)
            squares.push(square)

        }
        generate()
        generate()
    }
    createBoard()


    // generate a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    //swipe right
    function moveRight() {
        for (let i=0; i < 16; i++) {
            if (i % 4 == 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let TotalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(TotalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill('')
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
        }
    }
    

    //swipe left
    function moveLeft() {
        for (let i=0; i < 16; i++) {
            if (i % 4 == 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let TotalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(TotalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill('')
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]

            }
        }
    }

    //swipe down
    function moveDown() {
        for (let i=0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill('')
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]
        }
    }


    //swipe up
    function moveUp() {
        for (let i=0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+(width*2)].innerHTML
            let totalFour = squares[i+(width*3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill('')
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+(width)].innerHTML = newColumn[1]
            squares[i+(width*2)].innerHTML = newColumn[2]
            squares[i+(width*3)].innerHTML = newColumn[3]
        }
    }


    function combineRow() {
        for (let i=0; i < 15; i++) {
            if (squares[i].innerHTML == '') {
                squares[i].innerHTML = 0
            }
            if (squares[i+1].innerHTML == '') {
                squares[i+1].innerHTML = 0
            }
            if (squares[i].innerHTML == squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
                console.log(combinedTotal)
            }
        }
        checkForWin()
    }


    function combineColumn() {
        for (let i=0; i < 12; i++) {
            if (squares[i].innerHTML == '') {
                squares[i].innerHTML = 0
            }
            if (squares[i+1].innerHTML == '') {
                squares[i+1].innerHTML = 0
            }
            if (squares[i].innerHTML == squares[i+width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }
    
    //assign keycodes
    function control(e) {
        if(e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            console.log("Up")
            keyUp()
        } else if (e.keyCode === 40) {
            console.log("Down")
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
        changeColor()
    }

    function keyLeft () {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
        changeColor()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
        changeColor()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
        changeColor()
    }

    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You win!'
                document.removeEventListener('keyup', control)
            }
        }
    }

    // check if there are no zeros on our board to lose

    function checkForGameOver() {
        let zeros = 0
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            //resultDisplay.innerHTML = 'You Lose!'
            alert("No more moves, you lose!  Thanks for playing.  Click OK to start a new game")
            document.removeEventListener('keyup', control)
            location.reload();
        }
    }


    // check the color of the square and adjust according to the number (for better readability and enjoyment)
    function changeColor() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                squares[i].style.backgroundColor = "silver"
            }else if (squares[i].innerHTML == 2) {
                squares[i].style.backgroundColor = "lightgrey"
            } else if (squares[i].innerHTML == 4) {
                squares[i].style.backgroundColor = "slategrey"
            } else if (squares[i].innerHTML == 8) {
                squares[i].style.backgroundColor = "dimgrey"
            } else if (squares[i].innerHTML == 16) {
                squares[i].style.backgroundColor = "sandybrown"
            } else if (squares[i].innerHTML == 32) {
                squares[i].style.backgroundColor = "goldenrod"
            } else if (squares[i].innerHTML == 64) {
                squares[i].style.backgroundColor = "coral"
            } else if (squares[i].innerHTML == 128) {
                squares[i].style.backgroundColor = "chocolate"
            } else if (squares[i].innerHTML == 256) {
                squares[i].style.backgroundColor = "tan"
            } else if (squares[i].innerHTML == 512) {
                squares[i].style.backgroundColor = "orangered"
            } else if (squares[i].innerHTML == 1024) {
                squares[i].style.backgroundColor = "firebrick"
            } else if (squares[i].innerHTML == 2048) {
                squares[i].style.backgroundColor = "red"
            }
        }
    }

})
