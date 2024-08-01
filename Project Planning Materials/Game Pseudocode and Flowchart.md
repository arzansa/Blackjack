Blackjack:
![[Screenshot 2024-08-01 at 12.13.03 PM.png]]




1. Define required constants:
	- Blackjack, dealer stand amount, deck of cards

2. Define required variables used to track the state of the game:
	- Array of decks in play and their score
	- turn to check if player action or dealer action
	- winner
	- playerHand, dealerHand

3. Game rules:
	- player selects bet amount based on current bankroll, optionally number of hands
	- dealer deals. if dealer has Ace or 10, dealer checks for Blackjack. Insurance is offered. If Blackjack, flip immediately. Do not let player hit / split / double on dealer Blackjack.
	- player is shown point value of hand. If Ace in hand, split point value is shown (7 / 17 for A + 6). Player can hit, double, split if pair (6, 6; J, J; etc.). After double, player can not hit again. Player can double a hand resulting from a split, but the player still can not hit it again.
	- Doubling takes twice the bet amount from the player but pays out double. The player must have a sufficient amount of chips to do this. The same goes for splitting.
	- Blackjack pays 3/2. bet * 1.5

4. Player actions:
	- after rendering player hand, give player options based on their hand
	- handled by buttons. Hit, Split, Stand, Double
	- after stand, blackjack, or bust, render dealer hand
	- on double, rotate next card counter-clockwise, no more hits

5. Replay, Settings, Betting:
	 - placing bets will be handled with buttons, only show larger chips if player has the bankroll to place the bet
	 - display warning if player would be unable to split/double a given bet due to lack of funds
	 - replay button at the end of a hand. Keep current bet, double current bet, or return to betting screen
	 - settings button. adjust volume (SFX, music), dark mode, trainer mode, show dealer, etc.)
	


```js
/*-------------- Constants -------------*/
CONST DEALER_STAND = 17;
CONST BLACK_JACK = 21;
CONST DECK = deck; // starting deck

/*---------- state variables -------------*/
let table;
let turn;
let winner;
let deck; // deck after drawing


/*---------- Cached Elements -------------*/
start button getElementById

chips selection querySelectorAll

hit, split, double, stand buttons querySelectorAll

settings button getElementById

  

/*-------------- Event Listeners -------------*/

start button addEventListener('click', start)

chips selection addEventListener('click', checkBankroll)

hit, split, double, stand buttons addEventListener('click', updatePlayerHand)

settings button addEventListener('click', settings)



/*-------------- Functions -------------*/
checkPlayerHand(hand) {
	const score = getScore(hand);
	const split = canSplit(hand);
	const hit = canHit(hand);
	const double = canDouble(hand);
	return {score, split, hit, double};
;

split(hand) {
	return [hand, hand];
}

hit(hand) {
	hand.push(deck.pop());
}

shuffle(deck) {
	shuffle
}

deal() {
	updatePlayerHand();
	updateDealerHand();
}
```





implement wrapping text on the table:
"BLACKJACK PAYS 3 TO 2"
"DEALER MUST STAND ON 17 AND DRAW TO 16"
"INSURANCE PAYS 2 TO 1"



![[Screenshot 2024-08-01 at 2.18.52 PM.png]]






