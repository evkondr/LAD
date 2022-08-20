function checkUsedMoves(character, move){
    //returns true if move exists in usedMoves
    if(move === undefined || character === undefined){
        throw new Error("not all parametrs are passed");
    }
    return character.usedMoves.find(item => move.name == item.name);
}
module.exports = checkUsedMoves;