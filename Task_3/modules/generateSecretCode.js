const generateLengthOfNumber = () => {// this function generate secret code length from 3 to 6 digits
    return Math.floor(Math.random() * (7 - 3) + 3);
}
const generateSecretCode = () => { // this function generate secret code
    const codeLength = generateLengthOfNumber();
    let secret = "";
    for(let i = 0; i < codeLength; i++){
        const digit = Math.floor(Math.random() * 10);
        if(secret.indexOf(digit) >= 0){
           i-=1;
        }else{
            secret+=digit;
        }
    }
    return secret;
}
module.exports = generateSecretCode;