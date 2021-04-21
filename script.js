//DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//generate password event
generateEl.addEventListener('click', () =>{
    const hasLength = lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumbers = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(
        hasLength, 
        hasUpper, 
        hasLower, 
        hasNumbers, 
        hasSymbol
        );
});

//copying to clipboard

clipboardEl.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('The Password has been copied to clipboard');
      
});

//generate password function
function generatePassword(length, upper, lower, number, symbol){
    let generatePassword = '';

    const typesCount = lower + upper + number + symbol;

    //console.log('typescount: ', typesCount);

    const typeArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
    );

    //console.log('typesArr: ', typeArr);

    if(typesCount === 0){

        return '';
    }
    for(let i = 0; i < length; i += typesCount){
        typeArr.forEach(type =>{
            const funcName = Object.keys(type)[0];
            //console.log('funcName: ', funcName);

            generatePassword += randomFunc[funcName]();
        });
    }
    const finalPassword = (generatePassword.slice(0, length));

    return finalPassword;
}

//generator functions
function getRandomLower(){
     return String.fromCharCode (Math.floor(Math.random() * 26) + 97);
 }
 function getRandomUpper(){
    return String.fromCharCode (Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber(){
    return String.fromCharCode (Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=,.<>?""';
    return symbols[Math.floor(Math.random() * symbols.length)];

}

