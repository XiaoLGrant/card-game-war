//Example fetch using pokemonapi.co

let deckID = ''

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckID = data.deck_id
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

document.querySelector('#draw2').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
  
  
  // const draw2Button = document.querySelector('#draw2')
  let showPlayer1card1 = document.querySelector('#player1card1')
  let showPlayer2card1 = document.querySelector('#player2card1')
  
  let showPlayer1cardsHeld = document.querySelector('#player1cardsHeld')
  let showPlayer2cardsHeld = document.querySelector('#player2cardsHeld')

  let player1Pile = `https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Pile/add/?cards=`
  let player2Pile = `https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Pile/add/?cards=`
  
  resetCardBorder();
  resetRow2();


  
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      showPlayer1card1.src= data.cards[0].image
      showPlayer2card1.src = data.cards[1].image
      let valPlayer1card1 = convertToNum(data.cards[0].value)
      let valPlayer2card1 = convertToNum(data.cards[1].value)
      // player1card1.classList.toggle('hidden')
      // player2card1.classList.toggle('hidden')

      if (valPlayer1card1 > valPlayer2card1) {
        document.querySelector('h3').innerText = 'Player 1 wins'
        showPlayer1card1.style.border = '4px solid rgb(0,196,0)'
        function addToPlayer1Pile() {
          
          player1Pile + data.cards[0].code;
          player1Pile + data.cards[1].code;
        
          fetch(player1Pile)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
              showPlayer1cardsHeld.innerText = data.piles.player1Pile.remaining + ' cards held'
              showPlayer2cardsHeld.innerText = data.piles.player2Pile.remaining + ' cards held'
        
            })
            .catch(err => {
                console.log(`error ${err}`)
            });
        
        }
        addToPlayer1Pile();
        
      } else if (valPlayer1card1 < valPlayer2card1) {
        document.querySelector('h3').innerText = 'Player 2 wins'
        showPlayer2card1.style.border = '4px solid rgb(0,196,0)'
        player2Pile + data.cards[0].code;
        player2Pile + data.cards[1].code;

        function addToPlayer2Pile() {
          
          player2Pile + data.cards[0].code;
          player2Pile + data.cards[1].code;
        
          fetch(player2Pile)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
              showPlayer1cardsHeld.innerText = data.piles.player1Pile.remaining + ' cards held'
              showPlayer2cardsHeld.innerText = data.piles.player2Pile.remaining + ' cards held'
        
            })
            .catch(err => {
                console.log(`error ${err}`)
            });

        }
        addToPlayer2Pile();

      } else {
        showPlayer1card1.style.border = '4px solid rgb(255,191,0)'
        showPlayer2card1.style.border = '4px solid rgb(255,191,0)'
        drawWar();
        // document.querySelector('h3').innerText = 'WAR'
      }

      showPlayer1cardsHeld.innerText = data.piles.player1Pile.remaining + ' cards held'
      showPlayer2cardsHeld.innerText = data.piles.player2Pile.remaining + ' cards held'

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function drawWar() {
  const urlWar = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=8`

  // const drawForWar = document.querySelector('#war')

  let showPlayer1card2 = document.querySelector('#player1card2')
  let showPlayer1card3 = document.querySelector('#player1card3')
  let showPlayer1card4 = document.querySelector('#player1card4')
  let showPlayer1card5 = document.querySelector('#player1card5')

  let showPlayer2card2 = document.querySelector('#player2card2')
  let showPlayer2card3 = document.querySelector('#player2card3')
  let showPlayer2card4 = document.querySelector('#player2card4')
  let showPlayer2card5 = document.querySelector('#player2card5')

  fetch(urlWar)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      showPlayer1card2.src = data.cards[0].image
      showPlayer2card2.src = data.cards[1].image
      showPlayer1card3.src = data.cards[2].image
      showPlayer2card3.src = data.cards[3].image
      showPlayer1card4.src = data.cards[4].image
      showPlayer2card4.src = data.cards[5].image
      showPlayer1card5.src = data.cards[6].image
      showPlayer2card5.src = data.cards[7].image
      // let valPlayer1card2 = convertToNum(data.cards[0].value)
      // let valPlayer2card2 = convertToNum(data.cards[1].value)
      // let valPlayer1card3 = convertToNum(data.cards[2].value)
      // let valPlayer2card3 = convertToNum(data.cards[3].value)
      // let valPlayer1card4 = convertToNum(data.cards[4].value)
      // let valPlayer2card4 = convertToNum(data.cards[5].value)
      let valPlayer1card5 = convertToNum(data.cards[6].value)
      let valPlayer2card5 = convertToNum(data.cards[7].value)

      if (valPlayer1card5 > valPlayer2card5) {
        document.querySelector('h3').innerText = 'Player 1 wins'
        showPlayer1card5.style.border = '4px solid rgb(0,196,0)'
      } else if (valPlayer1card5 < valPlayer2card5) {
        document.querySelector('h3').innerText = 'Player 2 wins'
        showPlayer2card5.style.border = '4px solid rgb(0,196,0)'
      } else {
        document.querySelector('h3').innerText = 'another WAR'
      }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function resetCardBorder() {
  let showPlayer1card1 = document.querySelector('#player1card1')
  let showPlayer1card5 = document.querySelector('#player1card5')

  let showPlayer2card1 = document.querySelector('#player2card1')
  let showPlayer2card5 = document.querySelector('#player2card5')
 
  showPlayer1card1.style.border = '2px solid white'
  showPlayer2card1.style.border = '2px solid white'
  showPlayer1card5.style.border = '2px solid white'
  showPlayer2card5.style.border = '2px solid white'
}

function addToPlayer1Pile() {
  let player1Pile = `https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Pile/add/?cards=`
  player1Pile + data.cards[0].code;
  player1Pile + data.cards[1].code;

  addCards(player1Pile)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      let valPlayer1card1 = convertToNum(data.cards[0].value)
      let valPlayer2card1 = convertToNum(data.cards[1].value)
      showPlayer1cardsHeld.innerText = data.player1Pile.remaining + 'cards held'
      showPlayer2cardsHeld.innerText = data.player2Pile.remaining + 'cards held'

    })
    .catch(err => {
        console.log(`error ${err}`)
    });

}

function addToPlayer2Pile() {
  let player2Pile = `https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Pile/add/?cards=`

}

function resetRow2() {
  let showPlayer1card2 = document.querySelector('#player1card2')
  let showPlayer1card3 = document.querySelector('#player1card3')
  let showPlayer1card4 = document.querySelector('#player1card4')
  let showPlayer1card5 = document.querySelector('#player1card5')

  let showPlayer2card2 = document.querySelector('#player2card2')
  let showPlayer2card3 = document.querySelector('#player2card3')
  let showPlayer2card4 = document.querySelector('#player2card4')
  let showPlayer2card5 = document.querySelector('#player2card5')

  showPlayer1card2.src = ''
  showPlayer1card3.src = ''
  showPlayer1card4.src = ''
  showPlayer1card5.src = ''

  showPlayer2card2.src = ''
  showPlayer2card3.src = ''
  showPlayer2card4.src = ''
  showPlayer2card5.src = ''

}

function convertToNum(val) {
  if (val === 'ACE') {
    return 14
  } else if (val === 'KING') {
    return 13
  } else if (val === 'QUEEN') {
    return 12
  } else if (val === 'JACK') {
    return 11
  } else {
    return Number(val)
  }
}