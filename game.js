const textelment = document.getElementById('text');
const optionButtonElement = document.getElementById('option-buttons');

let state = {}

function startGame(){
state = {};
showTestNode(1);
}

function showTestNode(textNodeIndex){
    console.log("showTestNode called")
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textelment.innerText = textNode.text;

    while(optionButtonElement.firstChild){
        optionButtonElement.removeChild(optionButtonElement.firstChild)
    }
    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click',() => selectOption(option))
            optionButtonElement.appendChild(button);
        }
    })
}

function showOption(option){
  //  return true;
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
const nextTextNodeId = option.nextText
if(nextTextNodeId <= 0){
    return startGame();
}
state = Object.assign(state, option.setState);
showTestNode(nextTextNodeId);
}
  
const textNodes = [
    {
        id:1,
        text: 'you wake up in the strange place and you see a jar of blue goa near yoou.',
        options: [
            {
                text: 'Take Goo',
                setState: { blueGoo: true},
                nextText:2
            },
            {
                text:'leave the goo',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
          {
            text: 'Trade the goo for a sword',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo: false, sword: true },
            nextText: 3
          },
          {
            text: 'Trade the goo for a shield',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo: false, shield: true },
            nextText: 3
          },
          {
            text: 'Ignore the merchant',
            nextText: 3
          }
        ]
      },
      {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
          {
            text: 'Explore the castle',
            nextText: 4
          },
          {
            text: 'Find a room to sleep at in the town',
            nextText: 5
          },
          {
            text: 'Find some hay in a stable to sleep in',
            nextText: 4
          }
        ]
      },
      {
          id: 4,
          text: 'you are s tired that you fall asleep while exploring the castle and are killed by some treible monster in your speep.',
          options: [
              {
                text: 'Restart',
                nextText: -1 
              }
          ]
      }
]

startGame()