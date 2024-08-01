store 


bankroll sits in front of you


remove from bankroll

placing it into the bet


array of card objects


shows how to generate a new deck that is shuffled

start with single deck that shuffles every hand

can add multiple decks later (will have to check how many cards remain)


array.pop() or shift()

deal button shouldn't show up until minimum bet is placed

2 key pieces of state:

p hand and d hand (player and dealer)


does either have blackjack, do both?, 


after deal
before calling render

determine if there is an outcome

calculate winnings

win or push, return bet amount to the bankroll, set the bet to 0, return to bet selection

one function that can acommodate any outcome

if winnings, add the bet to the players bank again.

if blackjack, add bet * 1.5


if outcome is undecided, can hold null


if no winner


if hit, deal another card into player's array
recalculate hand value


function that always returns the best point value with A's

note that A's can automatically go to 1 if over 21


no getPlayerValue, getDealerValue

just one renderHand that returns the best value for the given hand (array)

and then rendering the containing element

pCardEl (Dom element)

outcome status 'D' for dealer 'P' for player 'PUSH' for push

return P for dealer bust





dealer stands on 17

dealer stands on soft 17


double down!

player cannot hit after double down

split...?



div to look like playing card

card of class

back of card

add the class of the card that you want to render (c4 is four of clubs)

if index[0] and dealer's hand, don't display until there's an outcome

left click chip -> add chip

right click chip -> remove chip

or plus and minus

disable the chips allowed based on how much is in their bankroll


shouldn't be able to bet 100 if they only have 90 in the bank

or I can grey them out

can iterate through to check if to display them



make sure to have horizontal real estate 

can use binary tree for hands

only render (update the DOM) in render function

don't update DOM in click handler functions

render {
	renderHands()
	renderBets()
	renderChips()
	renderWin()
	renderBankroll()
}




install docker on the server



[[Game Pseudocode and Flowchart]]