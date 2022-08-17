const readlineSync = require('readline-sync');
const exec = require('child_process').exec;
const generateSecretCode = require("./modules/generateSecretCode");

const secretCode = generateSecretCode();

const showResultMessage = (resultArr) => {// this function shows message with result of failed guess
    return resultArr.length > 0 ? `${resultArr.length} (${resultArr.join(",")})`: `${resultArr.length}`;
}

const startTheGame = () => {
    let attempts = 5;
    console.log(secretCode);
    exec("chcp 65001");
    let guess = readlineSync.question(`Загаданно число из ${secretCode.length} цифр. Количество попыток - ${attempts}. Ввудите ответ:\n`);
    while(guess !== secretCode){
        attempts--;
        if(attempts == 0){
            console.log("Количество попыток закончилось.");
            return;
        }
        const wrong = [];
        const correct = [];
        for(let i = 0; i < guess.length; i++){
            if(secretCode.indexOf(guess[i]) >= 0){
                secretCode[i] === guess[i] ? correct.push(guess[i]):wrong.push(guess[i]);
            }
        }
        const message = `совпавших цифр не на своих местах - ${showResultMessage(wrong)}, цифр на своих местах - ${showResultMessage(correct)}`;
        console.log(message);
        guess = readlineSync.question(`Осталось попыток - ${attempts}. Попробуйте снова:\n`);
    }
    if(guess === secretCode){
        console.log(`Вы угадали число ${secretCode}!`);
        return;
    }
}
//START
startTheGame();
