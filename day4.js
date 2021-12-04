let data = document.querySelector('pre').innerText.split('\n');
const nums = data.shift().split(',').map(Number);
let boards = [[[]]];

// console.log(nums); // This seems to be correct so far.
data = data.map(row => row.split(' ').map(Number));
for (let i = 0; i < data.length; i++) {  
    if (data[i].length === 1) {
        data.splice(i, 1);
        i--;
    } else {  
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 0) {
                data[i].splice(j, 1);
            }
        }
    }
}

while (data.length > 0) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 5; j++) {
            boards.push([[]])
            boards[i][j] = data.shift();
        }
    }
}

for (let i = 0; i < 401; i++) {  //Brute force. Sadface. Refactor 
    boards.pop();                // while loop if time permits
}






let winners = [];

function checkWinner(boards) {
    boards.forEach(board => {
        for (let i = 0; i < 5; i++) {
            if (board[i][0] === 'X' && board[i][1] === 'X' && board[i][2] === 'X' 
            && board[i][3] === 'X' && board[i][4] === 'X') {
                board[0][0] = 'W';
            }
        }
        for (let i = 0; i < 5; i++) {
            if (board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X' 
            && board[3][i] === 'X' && board[4][i] === 'X') {
                board[0][0] = 'W';
            }
        }
    for (let i = 0; i < 5; i++) {
            if (board[0][i] === 'X' && board[1][i+1] === 'X' && board[2][i+2] === 'X'
            && board[3][i+3] === 'X' && board[4][i+4] === 'X') {
                board[0][0] = 'W';
            }
        }
        for (let i = 4; i >= 0; i--) {
            if (board[0][i] === 'X' && board[1][i+1] === 'X' && board[2][i+2] === 'X'
            && board[3][i+3] === 'X' && board[4][i+4] === 'X') {
                board[0][0] = 'W';
            }
        }
    });
}

function markSpace(boards, currentNum){
    boards.forEach(board => {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (board[i][j] === currentNum) {
                    board[i][j] = 'X';
                }
            }
        }
    });
}

// function trimWinners(boards){
//     for (let i = 0; i < boards.length; i++) {  
//         if (boards[i][0][0] === 'W') {
//             boards.splice(i, 1);
//             console.log('I ran?');
//             i--;
//         } 
//     }
// }

let currentNum = 0;
let failsafe = 200;
while (boards.length > 1 && failsafe > 0) {
    currentNum = nums.shift();
    markSpace(boards, currentNum);
    checkWinner(boards);
    boards = boards.filter(board => board[0][0] !== 'W');
    // console.log('Filtered: ', boards)
    // trimWinners(boards);
    failsafe--;
}

console.log(currentNum);
console.log('Remaining numbers: ', nums);
console.log('Failsafe remaining: ', failsafe);
console.log(boards);

// GUESS 1:
// Winning draw is 68
// Board is ... 
// ['X', 69, 3, 45, 94]
// ['X', 90, 'X', 95, 48]
// ['X', 9, 2, 74, 59]
// ['X', 46, 'X', 98, 'X']
// ['X', 'X', 24, 31, 72]
// add all unmarked numbers, multiply by 68...
//859 * 68 = 58412

//GOT IT!
//Okay, find which board wins LAST...
//Editing original code, throwing copy below for reference if needed
/*

let data = document.querySelector('pre').innerText.split('\n');
const nums = data.shift().split(',').map(Number);
const boards = [[[]]];

// console.log(nums); // This seems to be correct so far.
data = data.map(row => row.split(' ').map(Number));
for (let i = 0; i < data.length; i++) {  
    if (data[i].length === 1) {
        data.splice(i, 1);
        i--;
    } else {  
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 0) {
                data[i].splice(j, 1);
            }
        }
    }
}

while (data.length > 0) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 5; j++) {
            boards.push([[]])
            boards[i][j] = data.shift();
        }
    }
}

for (let i = 0; i < 401; i++) {  //Brute force. Sadface. Refactor 
    boards.pop();                // while loop if time permits
}






let winner = false;

function checkWinner(boards) {
    boards.forEach(board => {
        for (let i = 0; i < 5; i++) {
            if (board[i][0] === 'X' && board[i][1] === 'X' && board[i][2] === 'X' 
            && board[i][3] === 'X' && board[i][4] === 'X') {
                winner = true;
                console.log(board);
            }
        }
        for (let i = 0; i < 5; i++) {
            if (board[0][i] === 'X' && board[1][i] === 'X' && board[2][i] === 'X' 
            && board[3][i] === 'X' && board[4][i] === 'X') {
                winner = true;
                console.log(board);
            }
        }
    for (let i = 0; i < 5; i++) {
            if (board[0][i] === 'X' && board[1][i+1] === 'X' && board[2][i+2] === 'X'
            && board[3][i+3] === 'X' && board[4][i+4] === 'X') {
                winner = true;
                console.log(board);
            }
        }
        for (let i = 4; i >= 0; i--) {
            if (board[0][i] === 'X' && board[1][i+1] === 'X' && board[2][i+2] === 'X'
            && board[3][i+3] === 'X' && board[4][i+4] === 'X') {
                winner = true;
                console.log(board);
            }
        }
    });
}

function markSpace(boards, currentNum){
    boards.forEach(board => {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (board[i][j] === currentNum) {
                    board[i][j] = 'X';
                }
            }
        }
    });
}

let currentNum = 0;
while (winner === false) {
    currentNum = nums.shift();
    markSpace(boards, currentNum);
    checkWinner(boards);
}

console.log(currentNum);








Solution Part 2?
[Array(5)]0: Array(5)0: (5) 
[67, 30, 89, 'X', 'X']1: (5) 
['X', 10, 38, 90, 'X']2: (5) 
['X', 'X', 'X', 'X', 'X']3: (5) 
[29, 'X', 'X', 'X', 'X']4: (5) 
['X', 80, 47, 12, 'X']length: 5[[Prototype]]: Array(0)length: 1[[Prototype]]: Array(0)
undefined
97+89+48+90+29+80+47+12
492
492*49
24108
TOO HIGH

I was trimming the wrong boards.  Fixed?
0: (5) ['X', 'X', 59, 'X', 'X']
1: (5) [80, 'X', 'X', 'X', 'X']
2: (5) ['X', 'X', 'X', 45, 'X']
3: (5) ['X', 2, 'X', 'X', 'X']
4: (5) [20, 'X', 'X', 'X', 23]
Winning draw: 7

229 * 7 = 1603 Too Low?

*59

*head scratch*
Needed to keep playing.  Last guess hadn't won yet.
59 * 170 =  10030




*/
