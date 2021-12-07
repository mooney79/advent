let positions = document.querySelector('pre').textContent.split(',').map(Number);
// let positions = [16,1,2,0,4,2,7,1,2,14];

positions.sort((a, b) => a - b);
let minPosition = positions[0];
let maxPosition = positions[999];

const startingPositions = positions.reduce((a, b) => a + b);
let benchmark = startingPositions * maxPosition;

function findFuelCost(distance){
    let subTotal = 0;
    for (let i = distance; i > 0; i--) {
        subTotal += i;
    }
    return subTotal;
}

for (let i = minPosition; i <= maxPosition; i++) {
    let testCase = 0;
    for (let j = 0; j < positions.length; j++) {
        let distance = Math.abs(positions[j] - i);
        testCase += findFuelCost(distance);  //Swap this with below for Part 1
        // testCase += Math.abs(positions[j] - i);
    }
    if (testCase < benchmark) {
        benchmark = testCase;
    }
}

console.log(benchmark);

//354,129 -- RIGHT ANSWER, first try.  Woo.
//494601, TOO LOW.  
//98905973 -- RIGHT ANSWER, second try.  Woo.