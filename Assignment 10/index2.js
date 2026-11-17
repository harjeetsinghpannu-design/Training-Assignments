let play_arr = ["Rahul", "Sachin", "Abhishek", "Sunil", "Virat", "Shikhar", "Ravichandran", "Kuldeep", "Suryakumar", "Shivam", "Rohit"];

console.log(play_arr);

play_arr.shift(); //first player removed

console.log(play_arr);

console.log(play_arr.length);

play_arr.push("Vivek");

console.log(play_arr);

console.log(play_arr.sort());


// let temp;                                       
// for(let k=0;k<play_arr.length-1;k++){
//     let min=k;
//     for(let l=k+1;l<play_arr.length-1;l++){
//         if(play_arr[min]>play_arr[l]){
//             min=l;
//         }
//     }
//     temp=play_arr[k];
//     play_arr[k]=play_arr[min];
//     play_arr[min]=temp;
// }

// console.log(play_arr)

// let temp;
// for(let k=0;k<play_arr.length-1;k++){
//     for(let l=0;l<play_arr.length-1-k;l++){
//         if(play_arr[l]>play_arr[l+1]){
//             temp=play_arr[l];
//             play_arr[l]=play_arr[l+1];
//             play_arr[l+1]=temp;
//         }
//     }
// }

// console.log(play_arr);

player_jersey = [];

for (let i of play_arr) {
    jer_num = Math.floor(Math.random() * 11) + 1;
    while (player_jersey.includes(jer_num)) {
        jer_num = Math.floor(Math.random() * 11) + 1;
    }
    console.log(`${i} - ${jer_num}`);
    player_jersey.push(jer_num);
}

play_arr_upper = [];
console.log(player_jersey);


// for(let j=0;j<play_arr.length;j++){
//     player_upper=play_arr[j].toUpperCase();
//     console.log(player_upper)
//     play_arr_upper[j]=player_upper;
// }

play_arr.forEach(e => {
    play_arr_upper.push(e.toUpperCase());
});

console.log(play_arr_upper)

