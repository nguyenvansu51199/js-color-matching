import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import { getRandomColorPairs, setTimerText, showReplayAgainButton } from './utils.js'
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

function handleEventColorList(liElement) {
  const shouldBlockClick = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus)
  const isClicked = liElement.classList.contains('active')
  if (!liElement || isClicked || shouldBlockClick) return
  liElement.classList.add('active')

  selections.push(liElement)
  if (selections.length < 2) return

  const firstColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color
  const isMatch = firstColor === secondColor

  if (isMatch) {
    const isWin = getInActiveColorList()
    if (isWin) {
      showReplayAgainButton()
      setTimerText()
      return
    }
    selections = []
    return
  }
  gameStatus = GAME_STATUS.BLOCKING

  setTimeout(() => {
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')
    selections = []
    gameStatus = GAME_STATUS.PLAYING
  }, 500)
}

function initEventClickColorList() {
  const ulElement = getColorListElement()
  if (!ulElement) return

  ulElement.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.tagName !== 'LI') return
    handleEventColorList(event.target)
  })
}

function initColors() {
  const colorList = getRandomColorPairs(PAIRS_COUNT)

  const liElementList = getColorElementList()

  liElementList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]
    const overlayElement = liElement.querySelector('.overlay')
    if (overlayElement) overlayElement.style.backgroundColor = colorList[index]
  })
}

// MAIN
;(() => {
  initColors()

  initEventClickColorList()
})()
