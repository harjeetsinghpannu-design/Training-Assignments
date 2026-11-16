// let calculator={"add":"+","sub":"-","div":"/","mul":"*","pow":"+"};

// let num1=Number(prompt("Enter the first number: "))
// let op=prompt("Enter the operation to be performed (add,sub,div,mul,pow): ");
// let num2=Number(prompt("Enter the second number: "))

// console.log(`The output is: ${eval(`${num1} ${calculator[op]} ${num2}`)}`)

const calculator={add:(a,b)=>a+b,
    sub:(a,b)=>a-b,
    div:(a,b)=>a/b,
    mul:(a,b)=>a*b,
    pow:(a,b)=>a**b
};

let num1=Number(prompt("Enter the first number: "));
let num2=Number(prompt("Enter the second number: "));
let op=prompt("Enter the operation to be performed (add,sub,div,mul,pow): ");

alert(`The output is: ${Number((calculator[op](num1,num2)).toFixed(2))}`)
