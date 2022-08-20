const readlineSync = require('readline-sync');
function chooseLevel(){
    let level  = readlineSync.question('Выберете уровень сложности от 5 до 10?');
    level = parseInt(level);
    while(isNaN(level) || level < 5 || level > 10){
        console.log("Вы должны ввести цифру от 5 до 10?");
        return chooseLevel();
    }
    return level;
}
module.exports = chooseLevel;