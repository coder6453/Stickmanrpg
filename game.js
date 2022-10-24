const textElement = document.getElementById('text')
const optionsButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionsButtonsElement.firstChild) {
    optionsButtonsElement.removeChild(optionsButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionsButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You walk into a forest.',
    options: [
      {
        text: 'Leave',
        nextText: 2
      },
      {
        text: 'Explore',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You turn around to leave, but there is a strange glowing wall.',
    options: [
      {
        text: 'Explore',
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'You walk deeper into the forest. You see three paths.',
    options: [
      {
        text: 'Left',
        nextText: 4
      },
      {
        text: 'Continue forward',
        nextText: 5
      },
      {
        text: 'Right',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You decide to take the path on the left. There is a small house there. ',
    options: [
      {
        text: 'Enter house',
        nextText: 7
      },
      {
        text: 'Continue forward',
        nextText: 8
      }
    ]
  },
  {
    id: 5,
    text: 'You continue the path. The path splits again.',
    options: [
      {
        text: 'Continue forward',//this results in running into a bear trap and restarting the game
        nextText: 9
      },
      {
        text: 'Go right.',
        nextText: 10
      }
    ]
  },
  {
    id: 6,
    text: 'You decide to go right. However you walk over a hole and fall to your death',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()
