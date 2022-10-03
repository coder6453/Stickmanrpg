const textElement = document.getElementById('text')
const optionButtonsElement = document.getElemendById('options-buttons')
let state = {}
function startGame{
  state = {}
  showTextNode(1)
}
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id  === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {          
optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () =>     
      selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return true
}

const textNodes = [
  {
    id: 1,
    text: 'u r stuck in forst',
    options: [
      {
        text: 'escape!!!!!',
        setState: { uTried: true },
        nextText: 2
      },
      {
        text: 'pick up grass from the ground',
        nextText: 2
      }

    ]
  },
  {
    id: 2
  }
]
function selectOption(option) {

}
startGame()
