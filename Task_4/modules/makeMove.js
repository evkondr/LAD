function makeMove(n){
    //returns move object for any passed context in function.call
    if(n === undefined){
        throw new Error("not all parametrs are passed");
    }
    if(this.moves[n].cooldown == 0){
        return this.moves[n];
    }
    this.usedMoves.push({name: this.moves[n].name, cooldown: this.moves[n].cooldown});
    return this.moves[n];
}
module.exports = makeMove;