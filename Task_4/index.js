const readlineSync = require('readline-sync');
const exec = require('child_process').exec;
const magician = require("./characters/magician");
const monster = require("./characters/monster");

function checkUsedMoves(character, move){
    //returns true if move exists in usedMoves
    return character.usedMoves.find(item => move.name == item.name)
}
function computerMakesMove(){
    const countOfMoves = this.moves.length;
    const random = Math.floor(Math.random() * countOfMoves);
    if(this.moves[random].cooldown == 0){
        return this.moves[random];
    }else {
        const wasUsed = checkUsedMoves(this, this.moves[random]);
        if(wasUsed){
            console.log("Was used");
            return computerMakesMove.call(this);
        }else{
            this.usedMoves.push({name: this.moves[random].name, cooldown: this.moves[random].cooldown});
            return this.moves[random]
        }
    }
    
}
function getAvailableMoves(){
    let available = [];
    this.moves.forEach(move => {
        if(!checkUsedMoves(this, move)) {
            available.push(move.name);
        }
    });
    return available;
}
function playerMoves(){
    
}
exec("chcp 65001");
const startGame = () => {
    let monsterMove, availableMoves, stopTheGame = false
    while(monster.maxHealth > 0 && magician.maxHealth > 0){
        monsterMove = computerMakesMove.call(monster);
        availableMoves = getAvailableMoves.call(magician);
        const playerMove = readlineSync.keyInSelect(availableMoves, `${monster.name} делает ${monsterMove.name}. Ваш ход:`);
        if(playerMove == -1){
            console.log("Игра окончена");
            process.exit();
        }
        magician.maxHealth-=monsterMove.physicalDmg;
        console.log(magician.maxHealth)
        startGame()
    }
}
startGame();