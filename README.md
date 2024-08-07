# Blackjack
Blackjack is one of the most popular casino games due to its low house edge. It is also a deceptively simple game to program with additional features for added difficulty (splitting, multiple hands, etc.). I've played a lot of online BlackJack games and I wanted to try programming it myself. This game currently allows for only 1 hand and no splitting but I plan to add those features soon.

# Screenshots

The game starts on the wagering screen where the player can select chips to place their bet:
<p align="center">
<img src="https://i.imgur.com/DghkmCU.png">
</p>
<h6 style="text-align: center">(Toggle music and sound effects with the buttons in the bottom left and right corners of the screen. Music will not play until prompted, sound effects play by default)</h6>

The dealer and player will then both be dealt cards and the player will have the option to hit or stand:
<p align="center">
<img src="https://i.imgur.com/cO9rirK.png" style="text-align: center" />
</p>

After standing (or the player has busted (cards total over 21)) the dealer's hidden card will be revealed, and the dealer will then draw up to 17, and if the player's card total is greater than the dealer's and they have not busted, they will win back double their wager:
<p align="center">
    <img src="https://i.imgur.com/C3v9JtO.png" style="margin: auto" />
</p>

The player can then play another round with the same wager, play another round with double their previous wager, or go back to the wagering screen to adjust their bet amount.

# Technologies Used

- JavaScript
- HTML
- CSS
- CardStarter CSS Library
- draw.io for the wireframe and flowchart found in the [planning materials](https://github.com/arzansa/Blackjack/tree/main/Project%20Planning%20Materials)
- FL Studio (original SFX and music produced by me)
- Aesprite (pixel art favicon created by me)





<h2>How to Play Blackjack</h2>
(From the 'How to Play' modal in game):
<p>Blackjack is a card game in which the players and the dealer try to score as close to 21 as possible without exceeding it.</p>
<h3>Basic Rules:</h3>
<ul>
    <li>This version is played with one deck that shuffles each hand and currently supports only one player.</li>
    <li>First, the player wagers a bet. Then the dealer and the player are both dealt two cards. One of the dealer's cards is dealt face down, and is only revealed after the player's turn is finished.</li>
    <li>As the player, you can choose to "hit" (take another card) or "stand" (keep your current hand). You can hit as many times as you want until you hit 21 or bust.</li>
    <li>If the player's total exceeds 21, they bust and lose the hand and their wager.</li>
    <li>If the player's total is closer to 21 than the dealer's without busting, the player wins double their wager.</li>
    <li>If the dealer and the player are tied, it is a "push", and the player's wager is returned.</li>
    <li>If the player has a natural Blackjack (A + 10 or face card), the wager is paid back 3 to 2, barring a push. Natural Blackjack always beats a regular 21.</li>
    <li>Splitting and Doubling down are not currently supported in this version.</li>
</ul>
<h3>Card Values:</h3>
<ul>
    <li>Number cards (2-10) are worth their face value.</li>
    <li>Face cards (Jack, Queen, King) are each worth 10 points.</li>
    <li>Aces can be worth 1 or 11 points, Whichever is more favorable for the player.</li>
</ul>

 

# Getting Started

[Planning Materials Document](https://github.com/arzansa/Blackjack/blob/main/Project%20Planning%20Materials/Game%20Pseudocode%20and%20Flowchart.md)

[Click here to play now!](https://arzansa.github.io/Blackjack/)

# Next Steps

- Add music ✅
- Add settings menu with volume slider
- Add doubling and splitting
- Multiple hands
- animate card flipping