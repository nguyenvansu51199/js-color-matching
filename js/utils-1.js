function shuffle(arr) {
  if (!Array.isArray(arr) || arr.length <= 2) return arr
  for (let i = arr.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * i)
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor

  const colorList = []
  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']

  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hueList[i % hueList.length],
    })

    colorList.push(color)
  }
  const fullColorList = [...colorList, ...colorList]

  shuffle(fullColorList)

  return fullColorList
}

// const numberList = [1, 2, 3]
// const cloneArray  = [...numberList, numberList]
// console.log(cloneArray)
// [1, 2, 3, 1, 2, 3]

// const numberList = [1, 2, 3]
// const cloneArray  = [...numberList, numberList]
// console.log(cloneArray)
// [1, 2, 3, [1, 2, 3]]

export function showReplayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  if (playAgainButton) playAgainButton.classList.add('show')
}

export function hideReplayAgainButton() {
  const playAgainButton = getPlayAgainButton()
  if (playAgainButton) playAgainButton.classList.remove('show')
}

export function setTimerText(text) {
  const timerELement = getTimerElement()
  if (timerELement) timerELement.textContent = text
}
