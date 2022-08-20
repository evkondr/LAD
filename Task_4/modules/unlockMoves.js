function unlockMove(){
    //cheeck fo exixting moves of objects passed as context, reduce cooldown for every found moves and returns new arr of used moves. 
    if(this.usedMoves.length > 0){
       this.usedMoves.forEach(move => {
        move.cooldown--;
       })
       this.usedMoves.forEach(move => {
        if(move.cooldown == 0){
            this.usedMoves = this.usedMoves.filter(item => item.name !== move.name)
        }
       })
    }
}
module.exports = unlockMove;