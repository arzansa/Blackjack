/*----- constants -----*/


/*----- state variables -----*/
let hands;
let turn;
let winner;
let bankroll;

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
function init() {
    hands = deal();
    turn = 'player';
    winner = false;
    bankroll = 5000;

    render();
}

function render() {
    
}

function deal() {
    return [updatePlayerHand(), updateDealerHand()];
}

function updatePlayerHand() {

}

function updateDealerHand() {

}



init();