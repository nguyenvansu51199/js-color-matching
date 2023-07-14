import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import { getRandomColorPairs } from './utils.js'
import { getColorElementList, getColorListElement } from './selectors.js'
// Global variables
let selections = []
let gameState = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handleEventColorList(liElement) {
  if (!liElement) return
  liElement.classList.add('active')
}

function initEventClickColorList() {
  const ulElement = getColorListElement()
  if (!ulElement) return

  ulElement.addEventListener('click', (event) => {
    console.log(event.target)
    handleEventColorList(event.target)
  })
}

function initColors() {
  const colorList = getRandomColorPairs(PAIRS_COUNT)

  const liElementList = getColorElementList()

  liElementList.forEach((liElement, index) => {
    const overlayElement = liElement.querySelector('.overlay')
    if (overlayElement) overlayElement.style.backgroundColor = colorList[index]
  })
}

// MAIN
;(() => {
  initColors()

  initEventClickColorList()
})()
