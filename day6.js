let fishes = document.querySelector('pre').textContent.split(',').map(Number);

// for (let i = 0; i < 80; i++) {
//     for (let j = 0; j < fishes.length; j++) {
//         if (fishes[j] === 0) {
//             fishes[j] = 7;
//             fishes.push(9);
//         }
//         fishes[j] = fishes[j] - 1;
//     }
// }

// console.log(fishes.length);

// 350149

//grows too fast.  The number of iterations is too high.  So instead track how many are
// at each number of days?

const daysLeft = [0, 0, 0, 0, 0, 0, 0, 0, 0]

for (const fish of fishes) {
    daysLeft[fish]++;
}

for (let i = 0; i < 256; i++) {
    const current = daysLeft.shift();
    daysLeft.push(current);
    daysLeft[6] += current;
}

let result = daysLeft.reduce((a, b) => a + b, 0);
console.log(result);

//1590327954513