/*----- constants -----*/
const DEALER_STAND = 17;
const BLACKJACK = 21;
const DECK = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];

/*----- state variables -----*/
let hands = {
    p: [],
    d: []
};
let turn; // as soon as the player stands
let winner;
let bankroll;
let deck = [];

/*----- cached elements  -----*/
const dealBtn = document.getElementById('deal');
const dHandEl = document.getElementById('dealerHand');
const pHandEl = document.getElementById('playerHand');

/*----- event listeners -----*/
dealBtn.addEventListener('click', deal);



init();

/*----- functions -----*/
function init() {
    winner = false;
    bankroll = 5000;
    deck = DECK.slice();
}

function render() {
    renderHands();
}

function renderHands() {
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
    updateHand(draw(), 'd');
    updateHand(draw(), 'p');
    updateHand(draw(), 'd');
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


