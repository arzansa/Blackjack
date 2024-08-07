/*----- constants -----*/
const DEALER_STAND = 17;
const BLACKJACK = 21;
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

/*----- cached elements  -----*/
const dealBtn = document.getElementById('deal');
const hitBtn = document.getElementById('hit');
const standBtn = document.getElementById('stand');
const dHandEl = document.getElementById('dealerHand');
const pHandEl = document.getElementById('playerHand');
const chipBtns = document.querySelectorAll('.chips');
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

/*----- event listeners -----*/
dealBtn.addEventListener('click', deal);
resetBtn.addEventListener('click', resetWager);
hitBtn.addEventListener('click', hitPlayer);
standBtn.addEventListener('click', stand);
wagerButtonsListener();



init();

/*----- functions -----*/
function init() {
    winner = '';
    turn = false;
    wager = 0;
    bankroll = 5000;
    deck = DECK.slice();
    render();
}

function render() {
    renderMoney();
    renderHands();
    renderButtons();
    renderMessages();
}

function renderMoney() {
    if (!turn) {
        wagerEl.innerHTML = `Wager: $${wager}`;
    } else if (winner == 'd') {
        wagerEl.innerHTML = `Wager: $${wager}`;
    }

    bankrollEl.innerHTML = `Bankroll: $${bankroll}`;
}

function renderButtons() {
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
    }

    if (turn) {
        hitBtn.classList.add("hidden");
        standBtn.classList.add("hidden");
    }

    if (bankroll < 1000 || dealt) {
        chip1000El.classList.add("hidden");
    } else if (bankroll > 1000 && chip1000El.classList.contains("hidden")) {
        chip1000El.classList.remove("hidden");
    }
    if (bankroll < 500 || dealt) {
        chip500El.classList.add("hidden");
    } else if (bankroll > 500 && chip500El.classList.contains("hidden")) {
        chip500El.classList.remove("hidden");
    }
    if (bankroll < 100 || dealt) {
        chip100El.classList.add("hidden");
    } else if (bankroll > 100 && chip100El.classList.contains("hidden")) {
        chip100El.classList.remove("hidden");
    }
    if (bankroll < 25 || dealt) {
        chip25El.classList.add("hidden");
    } else if (bankroll > 25 && chip25El.classList.contains("hidden")) {
        chip25El.classList.remove("hidden");
    }
    if (bankroll < 10 || dealt) {
        chip10El.classList.add("hidden");
    } else if (bankroll > 10 && chip10El.classList.contains("hidden")) {
        chip10El.classList.remove("hidden");
    }
    if (bankroll < 5 || dealt) {
        chip5El.classList.add("hidden");
    } else if (bankroll > 5 && chip5El.classList.contains("hidden")) {
        chip5El.classList.remove("hidden");
    }
    if (bankroll < 1 || dealt) {
        chip1El.classList.add("hidden");
    } else if (bankroll > 1 && chip1El.classList.contains("hidden")) {
        chip1El.classList.remove("hidden");
    }
}

function flipHiddenCard(flip) {
    if(!flip && !dHandEl.childNodes[1].classList.contains('back')) {
        dHandEl.childNodes[1].classList.add('back');
    } else if (flip && dHandEl.childNodes[1].classList.contains('back')) {
        dHandEl.childNodes[1].classList.remove('back');
    }
}

function hitPlayer() {
    hit('p');
    if (scores.p >= 21) turn = true;
    render();
}

function hit(person) {
    updateHand(draw(), person);
    setScores();
}


function renderHands() {
    dHandEl.innerHTML = '';
    pHandEl.innerHTML = '';

    if (turn) {
        while (scores.d < 17) {
            hit('d');
        }
    }

    for(card in hands.d) {
        dHandEl.innerHTML += `<div class="card ${hands.d[card]}"></div>`;
    }

    if(turn) {
        flipHiddenCard(true);
    } else {
        flipHiddenCard(false);
    }
    

    for(card in hands.p) {
        pHandEl.innerHTML += `<div class="card ${hands.p[card]}"></div>`;
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

function renderMessages() {
    if (dealt === true) {
        headersEl[0].innerHTML = "Dealer's Hand";
        headersEl[2].innerHTML = "Player's Hand";
        if (checkForAces(hands.p) && scores.p < 21) {
            headersEl[3].innerHTML = `${scores.p - 10} / ${scores.p}`;
            return;
        }
    }
    if (turn) {
        if (scores.d == 21) {
            headersEl[1].innerHTML = `Blackjack!`;
        } else if (scores.d > 21) {
            headersEl[1].innerHTML = `Bust! (${scores.d})`;
        } else {
            headersEl[1].innerHTML = `${scores.d}`;
        }
    }

    if (scores.p == 21) {
        headersEl[3].innerHTML = `Blackjack!`;
    } else if (scores.p > 21) {
        headersEl[3].innerHTML = `Bust! (${scores.p})`;
    } else {
        headersEl[3].innerHTML = `${scores.p}`;
    }


}

function deal() {
    if(wager <= 0) {
        return;
    }
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    // updateHand('sA', 'p');
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    // updateHand('sK', 'p');
    dealt = true;
    setScores();
    if (scores.p == 21) {
        turn = true;
    }
    render();
}

function scoreCards(cards, total) {
    for(let card of cards) {
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
    turn = true;
    render();
}

function updateHand(card, hand) {
    if (hand === 'p') {
        hands.p.push(card);
    } else if (hand === 'd') {
        hands.d.push(card);
    }
}


function draw() {
    let randomIdx = Math.floor(Math.random() * deck.length);
    let card = deck.splice(randomIdx, 1)[0];
    return card;
}

function resetWager() {
    bankroll += wager;
    wager = 0;
    render();
}

function wagerButtonsListener() {
    for (let btn of chipBtns) {
        btn.addEventListener('click', function() {
            let value = btn.innerHTML;
            if (bankroll > 0) {
                wager += parseInt(value);
                bankroll -= parseInt(value);
            }
            render();
        });
    }
}


