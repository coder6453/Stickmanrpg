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
        text: 'Continue forward',
        nextText: 9
      },
      {
        text: 'Go right',
        nextText: 10
      }
    ]
  },
  {
    id: 6,
    text: 'You decide to go right. However, you walk into a hole and fall to your death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You decide to enter the house. The house is empty. There is a book inside. ',
    options: [
      {
        text: 'Read book',
        nextText: 12
      },
      {
        text: 'Take book with you',
        setState: { book: true },
        nextText: 8
      },
      {
        text: 'Ignore the book',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: 'Walking through the forest, you find a small shop. There is a shopkeeper inside the shop.',
    options: [
      {
        text: 'Trade book for a flute',
        requiredState: (currentState) => currentState.book,
        setState: { book: false, flute: true },
        nextText: 13
      },
      {
        text: 'Ignore the shop',
        nextText: 13
      }
    ]
  },
  {
    id: 9,
    text: 'You decided to continue forward. But when you realized there was a bear trap in front of you, it was too late.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You decided to go right. You come across a river.',
    options: [
      {
        text: 'Try to cross',
        nextText: 11
      },
      {
        text: 'Take the path on the left',
        nextText: 17
      }
    ]
  },
  {
    id: 11,
    text: 'You decided to cross. You successfully get to the other side.',
    options: [
      {
        text: 'Continue Forward',
        nextText: 13
      }
    ]
  },
  {
    id: 12,
    text: 'You slowly open the book. However, when you open it, you get cursed.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 13,
    text: 'You come across a big door.',
    options: [
      {
        text: 'Play the flute',
        requiredState: (currentState) => currentState.flute,
        setState: { flute: false },
        nextText: 14
      },
      {
        text: 'Throw the book at the door',
        requiredState: (currentState) => currentState.book,
        setState: { book: false },
        nextText: 15
      },
      {
        text: 'Knock on the door',
        nextText: 16
      }
    ]
  },
  {
    id: 14,
    text: 'You play the flute. It suddenly disappears. You turn the knob on the door and it opens. You find a switch on the ground. You look forward and also see a door.',
    options: [
      {
        text: 'Pull the switch',
        nextText: 18
      },
      {
        text: 'Open the door',
        nextText: 19
      }
    ]
  },
  {
    id: 15,
    text: 'You throw the book with all of your strength. It opens and explodes you and the door.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 16,
    text: 'You knock and wait. Nothing happens and you starve to death.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
]

startGame()
