/*----- constants -----*/
const DECK = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];

/*----- state variables -----*/
let hands = {
    p: [],
    d: []
};
let dealt;
let winner;
let bankroll;
let deck = [];
let wager;
let scores = {
    p: 0,
    d: 0
}
let turn;
let pity;

/*----- cached elements  -----*/
const dealBtn = document.getElementById('deal');
const hitBtn = document.getElementById('hit');
const standBtn = document.getElementById('stand');
const dHandEl = document.getElementById('dealerHand');
const pHandEl = document.getElementById('playerHand');
const chipBtns = document.querySelectorAll('.chips');
const controlsEl = document.getElementById('controls');
const wagerEl = document.getElementById('wager');
const bankrollEl = document.getElementById('bankroll');
const chip1El = document.getElementById('chip-1');
const chip5El = document.getElementById('chip-5');
const chip10El = document.getElementById('chip-10');
const chip25El = document.getElementById('chip-25');
const chip100El = document.getElementById('chip-100');
const chip500El = document.getElementById('chip-500');
const chip1000El = document.getElementById('chip-1000');
const resetBtn = document.getElementById('reset');
const headersEl = document.querySelectorAll('.headers');
const playAgainBtn = document.getElementById('playAgain');
const playAgainDblBtn = document.getElementById('playAgainDouble');
const newWagerBtn = document.getElementById('newWager');
const chipSounds = [];
for (let i = 0; i < 9; i++) {
    chipSounds.push(new Audio(`audio/chip-sfx-${i}.wav`));
}
const cardSounds = [];
for (let i = 0; i < 9; i++) {
    cardSounds.push(new Audio(`audio/card-sfx-${i}.wav`));
}

/*----- event listeners -----*/
dealBtn.addEventListener('click', deal);
resetBtn.addEventListener('click', resetWager);
hitBtn.addEventListener('click', hitPlayer);
standBtn.addEventListener('click', stand);
playAgainBtn.addEventListener('click', playAgain);
playAgainDblBtn.addEventListener('click', playAgainDouble);
newWagerBtn.addEventListener('click', newWager);
wagerButtonsListener();

init();

/*----- functions -----*/
function addWinnings() {
    if (winner == 'p' && scores.p == 21 && hands.p.length == 2) {
        bankroll += wager*2.5;
    } else if (winner == 'p') {
        bankroll += wager*2;
    } else if (winner == 't') {
        bankroll += wager;
    }
}

function checkForAces(hand) {
    for (card of hand) {
        if (card.slice(1) === 'A') {
            return true;
        }
    }
    return false;
}

function clearHands() {
    hands.p = [];
    hands.d = [];
}

function deal() {
    playSound(cardSounds);
    if(wager <= 0) {
        return;
    }
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    dealt = true;
    setScores();
    if (scores.p == 21) {
        stand();
    }
    render();
}

function draw() {
    let randomIdx = Math.floor(Math.random() * deck.length);
    let card = deck.splice(randomIdx, 1)[0];
    return card;
}

function flipHiddenCard(flip) {
    if(!flip && !dHandEl.childNodes[1].classList.contains('back')) {
        dHandEl.childNodes[1].classList.add('back');
    } else if (flip && dHandEl.childNodes[1].classList.contains('back')) {
        dHandEl.childNodes[1].classList.remove('back');
    }
}

function hit(person) {
    updateHand(draw(), person);
    setScores();
}


function hitPlayer() {
    
    hit('p');
    if (scores.p >= 21) {
        stand();
    } else {
        playSound(cardSounds);
    }
    render();
}

function init() {
    winner = '';
    dealt = false;
    turn = false;
    wager = 0;
    bankroll = 5000;
    deck = DECK.slice();
    render();
}

function newWager() {
    playSound(cardSounds);
    playSound(chipSounds);
    wager = 0;
    if (bankroll < 1) {
        bankroll = 1;
        pity = true;
    }
    winner = '';
    turn = false;
    dealt = false;
    scores = {
        p: 0,
        d: 0
    }
    deck = DECK.slice();
    clearHands();
    render();
}

function playAgain() {
    if (bankroll < wager) {
        return;
    }
    bankroll -= wager;
    winner = '';
    turn = false;
    dealt = false;
    deck = DECK.slice();
    scores = {
        p: 0,
        d: 0
    }
    clearHands();
    deal();
}

function playAgainDouble() {
    if (bankroll < wager * 2) {
        return;
    }
    playSound(chipSounds);
    wager *= 2;
    playAgain();
}

function playSound(sounds) {
    let randomIdx = Math.floor(Math.random() * sounds.length);
    let sfx = sounds[randomIdx];
    if (sounds == cardSounds) {
        sfx.volume = 1;
    } else {
        sfx.volume = .1;
    }
    sfx.currentTime = 0;
    sfx.play();
}


function render() { 
    renderHands();
    renderButtons();
    renderMoney();
    renderMessages();
}

function renderButtons() {
    dealBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
    playAgainBtn.classList.add("hidden");
    playAgainDblBtn.classList.add("hidden");
    newWagerBtn.classList.add("hidden");
    if (wager == 0) {
        dealBtn.style.backgroundColor = "rgb(98, 109, 95)";
    } else {
        dealBtn.style.backgroundColor = "rgb(29, 69, 19)";
    }
    if (dealt) {
        dealBtn.classList.add("hidden");
        resetBtn.classList.add("hidden");
        hitBtn.classList.remove("hidden");
        standBtn.classList.remove("hidden");
        playAgainBtn.classList.add("hidden");
        playAgainDblBtn.classList.add("hidden");
        newWagerBtn.classList.add("hidden");
    }

    if (turn) {
        hitBtn.classList.add("hidden");
        standBtn.classList.add("hidden");
        playAgainBtn.classList.remove("hidden");
        if (bankroll < wager) {
            playAgainBtn.style.backgroundColor = "rgb(98, 109, 95)";
        } else {
            playAgainBtn.style.backgroundColor = "rgb(29, 69, 19)";
        }
        playAgainDblBtn.classList.remove("hidden");
        if (bankroll < wager * 2) {
            playAgainDblBtn.style.backgroundColor = "rgb(98, 109, 95)";
        } else {
            playAgainDblBtn.style.backgroundColor = "rgb(29, 69, 19)";
        }
        newWagerBtn.classList.remove("hidden");
    }

    if (bankroll < 1000 || dealt) {
        chip1000El.classList.add("hidden");
    } else if (bankroll >= 1000 && chip1000El.classList.contains("hidden")) {
        chip1000El.classList.remove("hidden");
    }
    if (bankroll < 500 || dealt) {
        chip500El.classList.add("hidden");
    } else if (bankroll >= 500 && chip500El.classList.contains("hidden")) {
        chip500El.classList.remove("hidden");
    }
    if (bankroll < 100 || dealt) {
        chip100El.classList.add("hidden");
    } else if (bankroll >= 100 && chip100El.classList.contains("hidden")) {
        chip100El.classList.remove("hidden");
    }
    if (bankroll < 25 || dealt) {
        chip25El.classList.add("hidden");
    } else if (bankroll >= 25 && chip25El.classList.contains("hidden")) {
        chip25El.classList.remove("hidden");
    }
    if (bankroll < 10 || dealt) {
        chip10El.classList.add("hidden");
    } else if (bankroll >= 10 && chip10El.classList.contains("hidden")) {
        chip10El.classList.remove("hidden");
    }
    if (bankroll < 5 || dealt) {
        chip5El.classList.add("hidden");
    } else if (bankroll >= 5 && chip5El.classList.contains("hidden")) {
        chip5El.classList.remove("hidden");
    }
    if (bankroll < 1 || dealt) {
        chip1El.classList.add("hidden");
    } else if (bankroll >= 1 && chip1El.classList.contains("hidden")) {
        chip1El.classList.remove("hidden");
    }
}

function renderHands() {
    dHandEl.innerHTML = '';
    pHandEl.innerHTML = '';


    for(card in hands.d) {
        dHandEl.innerHTML += `<div class="card ${hands.d[card]}" title="${hands.d[card]}"></div>`;
    }

    if(turn) {
        flipHiddenCard(true);
    } else if (dealt) {
        flipHiddenCard(false);
    }
    

    for(card in hands.p) {
        pHandEl.innerHTML += `<div class="card ${hands.p[card]}" title="${hands.p[card]}"></div>`;
    }
}

function renderMessages() {
    headersEl[0].innerHTML = "";
    headersEl[1].innerHTML = "";
    headersEl[2].innerHTML = "";
    headersEl[3].innerHTML = "";
    if (dealt === true) {
        headersEl[0].innerHTML = "Dealer's Hand";
        headersEl[2].innerHTML = "Player's Hand";
        if (checkForAces(hands.p) && scores.p < 21) {
            headersEl[3].innerHTML = `${scores.p - 10} / ${scores.p}`;
            return;
        }
    } else if (dealt === false) {
        headersEl[0].innerHTML = "";
        headersEl[1].innerHTML = "";
        headersEl[2].innerHTML = "";
        headersEl[3].innerHTML = "";
    }
    if (turn) {
        if (scores.d == 21 && hands.d.length == 2) {
            headersEl[1].innerHTML = `Blackjack!`;
        } else if (scores.d > 21) {
            headersEl[1].innerHTML = `Bust! (${scores.d})`;
        } else {
            headersEl[1].innerHTML = `${scores.d}`;
        }
    }

    if (scores.p == 21 && hands.p.length == 2) {
        headersEl[3].innerHTML = `Blackjack!`;
    } else if (scores.p > 21) {
        headersEl[3].innerHTML = `Bust! (${scores.p})`;
    } else if (dealt) {
        headersEl[3].innerHTML = `${scores.p}`;
    }

    if (pity) {
        headersEl[3].innerHTML = "Here's one on the house.";
        pity = false;
    }
}

function renderMoney() {
    if (!turn) {
        wagerEl.innerHTML = `Wager: $${wager}`;
    } else if (winner == 'd') {
        wagerEl.innerHTML = `You lost! -$${wager}`;
    } else if (winner == 'p' && scores.p == 21 && hands.p.length == 2) {
        wagerEl.innerHTML = `You won! +$${wager*2.5} (Blackjack win bonus x1.5)`;
    } else if (winner == 'p') {
        wagerEl.innerHTML = `You won! +$${wager*2}`;
    } else if (winner == 't') {
        wagerEl.innerHTML = `Push! Your wager has been returned. (+$${wager})`;
    }

    bankrollEl.innerHTML = `Bankroll: $${bankroll}`;
}

function resetWager() {
    if (wager > 0) {
        playSound(chipSounds);
    }
    bankroll += wager;
    wager = 0;
    render();
}

function scoreCards(cards, total) {
    for (let card of cards) {
        card = card.slice(1);

        if ('JQK'.includes(card)) {
            card = 10;
        } else if ('A'.includes(card)) {
            card = 11;
        }
        card = parseInt(card);
        total += card;
    }
    return total;
}

function setScores() {
    let pTotal = 0;
    let dTotal = 0;
    let pCards = hands.p;
    let dCards = hands.d;

    pTotal = scoreCards(pCards, pTotal);
    dTotal = scoreCards(dCards, dTotal);

    scores.p = pTotal;
    scores.d = dTotal;
}

function stand() {
    playSound(cardSounds);
    while (scores.d < 17) {
        hit('d');
    }
    turn = true;
    setScores();
    setWinner();
    addWinnings()
    render();
}

function setWinner() {
    if ((scores.p > scores.d && scores.p <= 21) || (scores.d > 21 && scores.p <= 21)) {
        winner = 'p';
    } else if (scores.p === scores.d && scores.p <= 21) {
        if (scores.p == 21 && scores.d == 21) {
            if (!(hands.d.length == 2)
                && hands.p.length == 2) {
                winner = 'p';
            } else if ((hands.d.length == 2)
                && !(hands.p.length == 2)) {
                winner = 'd';
            } else {
                winner = 't';
            }
        } else {
            winner = 't';
        }
    } else {
        winner = 'd';
    }
}

function updateHand(card, hand) {
    if (hand === 'p') {
        hands.p.push(card);
    } else if (hand === 'd') {
        hands.d.push(card);
    }
}
function wagerButtonsListener() {
    for (let btn of chipBtns) {
        btn.addEventListener('click', function() {
            let value = btn.innerHTML;
            playSound(chipSounds);
            if (bankroll > 0) {
                wager += parseInt(value);
                bankroll -= parseInt(value);
            }
            render();
        });
    }
}


