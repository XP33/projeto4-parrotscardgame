// Card Functions
function addCards() {
    const cardsContainer = document.querySelector(".cards-container")
  
    cardsContainer.innerHTML = RandomizeCards()
  }
  
  function RandomizeCards() {

    const arrayOfNumbers = []
  
    let bgNumber = null
    let cardStructure = ''
  
    for(let index = 0; index < validNumberOfCards; index++) {
      bgNumber = getRandomNumber(validNumberOfCards / 2)
  
      let maxRandomBgArray = (arrayOfNumbers.filter((number) => number === bgNumber))
  
      // Verifies if the same background has already been aplied two times
      while(maxRandomBgArray.length === 2) {
        bgNumber = getRandomNumber(validNumberOfCards / 2)
  
        maxRandomBgArray = (arrayOfNumbers.filter((number) => number === bgNumber))
      }
  
      cardStructure += `
        <div class="card" data-identifier="card">
        <div class="front-face face" data-identifier="front-face"></div>
        <div class="back-face face bg${bgNumber}" data-identifier="back-face"></div>
        </div>
        `
  
      arrayOfNumbers.push(bgNumber)
    }
    return cardStructure
  }
  
  function allCardsUp() {
    if(youWinComparator === validNumberOfCards) {
      timer.stopTimer()
  
      setTimeout(() => {
        alert(`Você ganhou em ${timer.element.innerHTML} segundos e ${turnedCardsCount} jogadas!`)
      }, 500)
  
      setTimeout(() => {
        const answer = prompt('Deseja testar sua memória outra vez? Y/N')
        const validAnswer = answer.trim().toUpperCase()
  
        if(validAnswer === 'Y' || validAnswer === 'YES') {
          restart()
        }
      }, 500)
    }
  }
  
  // Card click functions
  function CardClick() {
    const cards = document.querySelectorAll('.card')
  
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        clickedCards.push(card)
        turnedCardsCount++
        clicks++
  
        // Start counting time
        if(turnedCardsCount === 1) {
          timer.startTimer()
        }
  
        const firstClick = (clicks === 1)
        const secondClick = (clicks === 2)
        const offClick = (clicks >= 3)
  
        if(firstClick) {
          flipCards(card)
        } else if(secondClick) {
          flipCards(card)
          compareClickedCards()
        } else if(offClick) {
          turnedCardsCount--
          clicks--
        }
      })
    })
  }
  
  function compareClickedCards() {
    const firstClickedCardClassList = (clickedCards[0].children[1].classList.value)
    const secondClickedCardClassList = (clickedCards[1].children[1].classList.value)
  
    const cardsAreEqual = firstClickedCardClassList == secondClickedCardClassList
  
    if(cardsAreEqual) {
      youWinComparator += 2
  
      resetClickCount()
      allCardsUp()
  
    } else {
      flipCardsBack()
    }
  }
  
  function resetClickCount() {
    clicks = 0
  
    for(let index = 0; index <= clickedCards.length; index++) {
      clickedCards.pop()
    }
  }
  
  function flipCards(card) {
    // Flip card
    card.querySelector('.back-face').style.transform = 'rotateY(0deg)'
    card.querySelector('.front-face').style.transform = 'rotateY(-180deg)'
  }
  
  function flipCardsBack() {
    // Return card to initial position
    clickedCards.forEach((card) => {
      setTimeout(() => {
        card.querySelector('.back-face').style.transform = 'rotateY(180deg)'
        card.querySelector('.front-face').style.transform = 'rotateY(0deg)'
      }, 1000)
    })
    resetClickCount()
  }
  
  // Get valid number of cards
  function getNumCards() {
    const numberOfCards = parseInt(prompt("Para começar o jogo escolha um número PAR entre 4 e 14"))
  
    const validateEvenNumber = (numberOfCards % 2 == 0)
    const validateNumberOfCards = ((numberOfCards >= 4) && (numberOfCards <= 14))
    const isNotValid = ((!validateEvenNumber === false) && (!validateNumberOfCards === false))
  
    if(isNotValid !== true) {
      getNumCards();
    } else {
      return numberOfCards;
    }
  }
  
  // Randomizer
  function getRandomNumber(number) {
    const randomNumber = (Math.floor(Math.random() * number))
  
    return randomNumber + 1
  }
  
  // Restar game -> Bonus
  function restart() {
    youWinComparator = 0
    turnedCardsCount = 0
    resetClickCount()
  
    timer.element.innerHTML = '0'
  
    const cardsContainer = document.querySelector('.cards-container')
    cardsContainer.innerHTML = ''
  
    validNumberOfCards = getNumCards()
  
    setTimeout(() => {addCards()}, 500)
    setTimeout(() => {CardClick()}, 500)
  }
  
  // Timer Functions - Bonus (training object usage)
  const timer = {
    element: document.querySelector('header .timer'),
    interval: number = 0,
  
    startTimer() {
      const interval = setInterval(() => {
        this.element.innerHTML = parseInt(this.element.innerHTML) + 1
      }, 1000)
  
      this.interval = interval
    },
  
    stopTimer() {
      clearInterval(this.interval)
    }
  }
  
  // Declarations
  
  let validNumberOfCards = getNumCards()
  const clickedCards = []
  
  let youWinComparator = 0
  let turnedCardsCount = 0
  let clicks = 0
  
  addCards()
  CardClick()