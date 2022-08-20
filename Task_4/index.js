const readlineSync = require('readline-sync');
const exec = require('child_process').exec;
const magician = require("./characters/magician");
const monster = require("./characters/monster");
const makeMove = require("./modules/makeMove");
const checkUsedMoves = require("./modules/checkUsedMoves");
const chooseLevel = require("./modules/chooseLevel");
const getAvailableMoves = require("./modules/getAvailableMoves");
const unlockMove = require("./modules/unlockMoves");

function computerMakesMove(){
    //returns random computer move object for any passed context in function.call
    console.log(monster.usedMoves);
    const countOfMoves = monster.moves.length;
    const random = Math.floor(Math.random() * countOfMoves);
    const wasUsed = checkUsedMoves(monster, monster.moves[random]);
    if(wasUsed){
        return computerMakesMove();
    }
    unlockMove.call(monster);
    return makeMove.call(monster, random);
}
function playerMakesMove(str){ //str - name of move as string
    const index = magician.moves.findIndex(move => move.name === str);
    unlockMove.call(magician);
    return makeMove.call(magician, index);
}

exec("chcp 65001");
const startGame = () => {
    const level = chooseLevel();
    magician.maxHealth = level;
    let monsterMove, availableMoves, stopTheGame = false
    while(monster.maxHealth > 0 && magician.maxHealth > 0){
        monsterMove = computerMakesMove();
        availableMoves = getAvailableMoves.call(magician);
        const selectedMove = readlineSync.keyInSelect(availableMoves, `${monster.name} делает ${monsterMove.name}. Ваш ход:`);
        if(selectedMove  == -1){
            console.log("Игра окончена");
            process.exit();
        }
        const playerMove = playerMakesMove(availableMoves[selectedMove]);
        magician.maxHealth-=monsterMove.physicalDmg;
        monster.maxHealth-=playerMove.physicalDmg;
    }
    const winner = magician.maxHealth > monster.maxHealth ? magician.name : monster.name;
    console.log(`Игра окончена. Победитель ${winner}`)
}
startGame();