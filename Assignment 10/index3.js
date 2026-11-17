//@ts-check

const disp = () => {
    for (let i = 1; i <= 100; i++) {
        console.log(i);
    }
}

disp();

const todate = () => {
    let today = new Date();
    console.log(`Today's date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`);
}

todate();

let inp = Number(prompt("Enter the degree Fahrenheit value: "));

/**
 * Converts temperature from degree celsius to degree farhenheit
 * @param {number} cel - temperature in degree celsius
 * @returns {number} - temperature in degree farhenheit
 * @example
 * celtofar(35)
 */

const celtofar = (cel) => {
    return (9 / 5) * cel + 32;
}

var far_temp = celtofar(cel);

console.log(`Fahrenheit value: ${far_temp}°F`);

let arr = prompt("Enter the Array with comma separated values: ").split(",").map(n => Number(n));
console.log(arr);
// const avg=(array)=>{
//     let sum=0;
//     for(let i of array){
//         sum+=i;
//     }
//     return (sum/array.length)
// }

// console.log(avg(arr));

const avg = (array) => {
    let sum = array.reduce((a, b) => (a + b));
    return (sum / array.length);
}

console.log(`Average of the given array is: ${avg(arr)}`);

let str = prompt("Enter the string: ");

// const rev=(str)=>{
//     var revstr="";
//     for(let i=str.length-1;i>=0;i--){
//         revstr+=str[i];
//     }
//     return revstr;
// }
// console.log(rev(str));

const rev = str.split("").reverse().join("");

console.log(rev);


// const rev=(str)=>{
//     let revarr=new Array();
//     for(let i=str.length-1;i>=0;i--){
//         revarr.push(str[i])
//     }
//     return revarr.join("");
// }