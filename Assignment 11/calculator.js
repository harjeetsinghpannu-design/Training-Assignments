// let calculator={"add":"+","sub":"-","div":"/","mul":"*","pow":"+"};

// let num1=Number(prompt("Enter the first number: "))
// let op=prompt("Enter the operation to be performed (add,sub,div,mul,pow): ");
// let num2=Number(prompt("Enter the second number: "))

// console.log(`The output is: ${eval(`${num1} ${calculator[op]} ${num2}`)}`)

const calculator = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    div: (a, b) => a / b,
    mul: (a, b) => a * b,
    pow: (a, b) => a ** b
};

function startCalc() {
    let num1 = Number(prompt("Enter the first number: "));
    let num2 = Number(prompt("Enter the second number: "));
    let op = prompt("Enter the operation to be performed (add,sub,div,mul,pow): ");
    return { num1, num2, op }
}

let continueCalc = true;

while (continueCalc) {
    input = startCalc();
    if (!(input.op in calculator)) {
        alert("Invalid Operation. Enter a valid operation to proceed.");
    }
    else {
        alert(`The output is: ${Number((calculator[input.op](input.num1, input.num2)).toFixed(2))}`);
    }
    continueCalc = confirm("Would you like to start the calculator again ?")
}



