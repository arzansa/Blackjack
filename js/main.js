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
wagerButtonsListener();



init();

/*----- functions -----*/
function init() {
    winner = false;
    wager = 0;
    bankroll = 5000;
    deck = DECK.slice();
    render();
}

function render() {
    renderMoney();
    renderHands();
    renderButtons();
}

function renderMoney() {
    wagerEl.innerHTML = `Wager: $${wager}`;
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

function hitPlayer() {
    hit('p');
    render();
}

function hit(person) {
    updateHand(draw(), person);
}

function renderHands() {
    dHandEl.innerHTML = '';
    pHandEl.innerHTML = '';
    for(card in hands.d) {
        dHandEl.innerHTML += `<div class="card ${hands.d[card]}"></div>`;
        if (card == 1) {
            thisCard = document.querySelector(`.${hands.d[card]}`);
            thisCard.classList.add('back');
        }
    }
    for(card in hands.p) {
        pHandEl.innerHTML += `<div class="card ${hands.p[card]}"></div>`;
    }
}

function deal() {
    if(wager <= 0) {
        return;
    }
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    dealt = true;
    headersEl[0].innerHTML = "Dealer's Hand";
    headersEl[1].innerHTML = "Player's Hand";
    headersEl[2].innerHTML = "1/1";
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
            console.log(value);
            if (bankroll > 0) {
                wager += parseInt(value);
                bankroll -= parseInt(value);
            }
            render();
        });
    }
}


