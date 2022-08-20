const checkUsedMoves = require("./checkUsedMoves");

function getAvailableMoves(){
    const names = [];
    this.moves.forEach(move => {
        if(!checkUsedMoves(this, move)) {
            names.push(move.name);
        }
    });
    return names;
}
module.exports = getAvailableMoves;