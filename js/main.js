import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import {
  getRandomColorPairs,
  hideReplayAgainButton,
  setTimerText,
  showReplayAgainButton,
} from './utils.js'
import {
  getColorElementList,
  getColorListElement,
  getInActiveColorList,
  getPlayAgainButton,
} from './selectors.js'
// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

//  handleColorClick 1
//  handleColorClick 2
//  handleColorClick 3
// setTimeout 2 --> reset selections
// setTimeout 3 --> error here

function handleColorClick(liElement) {
  const shouldBlockClick = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus)
  const isClicked = liElement.classList.contains('active')
  if (!liElement || isClicked || shouldBlockClick) return
  liElement.classList.add('active')

  // save clicked save to selections
  selections.push(liElement)
  if (selections.length < 2) return

  // check match
  const firstColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color
  const isMatch = firstColor === secondColor

  if (isMatch) {
    // check win
    const isWin = getInActiveColorList().length === 0
    if (isWin) {
      // show replay
      showReplayAgainButton()
      // show You win
      setTimerText('YOU WIN')
      // update game status
      gameStatus = GAME_STATUS.FINISHED
    }

    selections = []
    return
  }

  // in case of not match
  // remove active class for 2 li elements
  gameStatus = GAME_STATUS.BLOCKING

  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')

    // reset selections for the next turn
    selections = []

    gameStatus = GAME_STATUS.PLAYING
  }, 500)
}

function initColors() {
  // random 8 pairs of colors
  const colorList = getRandomColorPairs(PAIRS_COUNT)

  // bind to li > div.overlay
  const liList = getColorElementList()
  liList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]

    const overlayElement = liElement.querySelector('.overlay')
    if (overlayElement) overlayElement.style.backgroundColor = colorList[index]
  })
}

function attachEventForColorList() {
  const ulElement = getColorListElement()
  if (!ulElement) return

  ulElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    handleColorClick(event.target)
  })
}

function resetGame() {
  // reset global vars
  gameStatus = GAME_STATUS.PLAYING
  selections = []

  // reset DOM elements
  // - remove active class from li
  // - hide replay button
  // - clear you win / timeout test
  const colorElementList = getColorElementList()
  for (const colorElement of colorElementList) {
    colorElement.classList.remove('active')
  }

  hideReplayAgainButton()
  setTimerText('')

  // re-generate new colors
  initColors()
}

function attachEventForPlayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  if (!playAgainButton) return

  playAgainButton.addEventListener('click', resetGame)
}

// main
;(() => {
  initColors()

  attachEventForColorList()
  attachEventForPlayAgainButton()
})()
