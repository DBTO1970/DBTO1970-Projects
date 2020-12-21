document.addEventListener('DOMContentLoaded', () => {
	
	// card options
	const cardArray = [
	{
		name: 'bearings',
		img: 'images/bearings.png'
	},
	{
		name: 'bearings',
		img: 'images/bearings.png'
	},
	{
		name: 'fountain',
		img: 'images/fountain.png'
	},
	{
		name: 'fountain',
		img: 'images/fountain.png'
	},
	{
		name: 'girl',
		img: 'images/girl.png'
	},
	{
		name: 'girl',
		img: 'images/girl.png'
	},
	{
		name: 'hangOn',
		img: 'images/hangOn.png'
	},
	{
		name: 'hangOn',
		img: 'images/hangOn.png'
	},
	{
		name: 'invasion',
		img: 'images/invasion.png'
	},
	{
		name: 'invasion',
		img: 'images/invasion.png'
	},
	{
		name: 'shattered',
		img: 'images/shattered.png'
	},
	{
		name: 'shattered',
		img: 'images/shattered.png'
	},
	
	]
	
	cardArray.sort(() => 0.5 - Math.random())
	
	const grid = document.querySelector('.grid')
	const resultDisplay = document.querySelector('#result')
	var cardsChosen = []
	var cardsChosenId = []
	var cardsWon = []
	
	// create board
	function createBoard() {
		for (let i = 0; i < cardArray.length; i++) {
			var card = document.createElement('img')
			card.setAttribute('src', 'images/blank.png')
			card.setAttribute('data-id', i)
			card.addEventListener('click', flipCard)
			grid.appendChild(card)
		}
		
	}
	
	// check for matches
	function checkForMatch() {
		var cards = document.querySelectorAll('img')
		const optionOneId = cardsChosenId[0]
		const optionTwoId = cardsChosenId[1]
		if (cardsChosen[0] === cardsChosen[1]) {
			alert('You found a match!')
			cards[optionOneId].setAttribute('src', 'images/white.png')
			cards[optionTwoId].setAttribute('src', 'images/white.png')
			cardsWon.push(cardsChosen)
		} else {
			cards[optionOneId].setAttribute('src', 'images/blank.png')
			cards[optionTwoId].setAttribute('src','images/blank.png')
			alert('Sorry, try again.')
		}
		cardsChosen = []
		cardsChosenId = []
		resultDisplay.textContent = cardsWon.length
		if (cardsWon.length === cardsArray/2) {
			resultDisplay.textContent = 'Congratulations!  You found them all!'
		}
	}
	
	// flip your card
	function flipCard() {
		var cardId = this.getAttribute('data-id')
		cardsChosen.push(cardArray[cardId].name)
		cardsChosenId.push(cardId)
		this.setAttribute('src', cardArray[cardId].img)
		if(cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500)
		}
			
	}
	
	createBoard()
})