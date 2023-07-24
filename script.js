const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");

const topDisplay = document.getElementById('top');
const bottomDisplay = document.getElementById('bottom');
const del = document.getElementById('delete');

let firstOperand="", secondOperand="", operator="";
let firstMinus="";


function updateFirstOperand(e) {
    firstOperand+=`${firstMinus}${e.target.id}`;
    firstMinus="";
    bottomDisplay.textContent=firstOperand;
}

function updateSecondOperand(e) {
    secondOperand+=`${e.target.id}`;
    topDisplay.textContent=firstOperand+operator;
    bottomDisplay.textContent=secondOperand;
}

function updateOperator(e) {
    operator=`${e.target.id}`;
    topDisplay.textContent=firstOperand;
    bottomDisplay.textContent=operator;
}

function result() {
    if(operator=='+')
        return Number(firstOperand)+Number(secondOperand);
    else if(operator=='-')
        return Number(firstOperand)-Number(secondOperand);
    else if(operator=='x')
        return Number(firstOperand)*Number(secondOperand);
    else if(operator=='/')
        return Number(firstOperand)/Number(secondOperand);
    else if(operator=='%')
        return Number(firstOperand)%Number(secondOperand);
}

numbers.forEach(num => {
    num.addEventListener('click', (e) => {
        if(secondOperand==="flag") {
            firstOperand="";
            secondOperand="";
            operator="";
        }
        if(operator==="") {
            updateFirstOperand(e);
            console.log(firstOperand);
        }
        else {
            updateSecondOperand(e);
            console.log(secondOperand);
        }
    })
});

operators.forEach(op => {
    op.addEventListener('click', (e) => {
        if(firstOperand=="" && e.target.id!=='-')
        ;
        else if(firstOperand=="" && e.target.id=='-'){
            firstMinus='-';
            bottomDisplay.textContent='-';
        }
        else if(secondOperand!=="" && secondOperand!=="flag"){
            let res = result();
            if(!Number.isInteger(res)){
                res=res.toFixed(6);
                res=`${res}`;
                res=parseFloat(res);
            }
            firstOperand=res;
            secondOperand="";
            updateOperator(e);
        }
        else if(secondOperand=="" || secondOperand==="flag")
            updateOperator(e);
            secondOperand="";
    })
});

equals.addEventListener('click', () => {
    let ans=result();
    topDisplay.textContent="";
    if(!Number.isInteger(ans)){
        ans=ans.toFixed(6);
        ans=`${ans}`;
        ans=parseFloat(ans);
    }
    firstOperand=ans;
    operator="";
    secondOperand="flag";
    bottomDisplay.textContent=ans;
});

del.addEventListener('click', () => {
    if(secondOperand!=="") {
        secondOperand=secondOperand.substring(0,secondOperand.length-1);
        bottomDisplay.textContent=secondOperand;
    }
    else if (operator!=="") {
        operator="";
        bottomDisplay.textContent=operator;
    }
    else if(firstOperand!=="") {
        firstOperand=firstOperand.substring(0,firstOperand.length-1);
        bottomDisplay.textContent=firstOperand;
    }
});

clear.addEventListener('click', () => {
    bottomDisplay.textContent="";
    topDisplay.textContent="";
    firstOperand="";
    secondOperand="";
    operator="";
});

