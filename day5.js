let linesRaw = document.querySelector('pre').textContent.split('\n');
let lines = [];
linesRaw.forEach(line => lines.push(line.split(' -> ')));
lines.pop();

lines.forEach(line => {
    line[0] = line[0].split(',').map(Number);
    line[1] = line[1].split(',').map(Number);
});

// UNCOMMENT FOR PART 1
// let initialLines = lines.filter(line => {  
//     if (line[0][0] === line[1][0] || line[0][1] === line[1][1]) {
//         return true
//     } else {
//         return false
//     }
// });

let totalPoints = [];

lines.forEach(line => {  // Change to initialLines.forEach for part 1
    if (line[0][0] === line[1][0]) {
        let range = line[1][1] - line[0][1];
        if (range > 0) {
            for (let i = 1; i < range; i++) {
                line.push([line[0][0], line[0][1] + i]);
            }
        } else {
            for (let i = -1; i > range; i--) {
                line.push([line[0][0], line[0][1] + i]);
            }
        }
    } else if (line[0][1] === line[1][1]) {
        let range = line[1][0] - line[0][0];
        if (range > 0) {
            for (let i = 1; i < range; i++) {
                line.push([line[0][0] + i, line[0][1]]);
            }
        } else {
            for (let i = -1; i > range; i--) {
                line.push([line[0][0] + i, line[0][1]]);
            }
        }
    } else {
        let rangeX = line[1][0] - line[0][0];
        let rangeY = line[1][1] - line[0][1];
        let step = Math.abs(rangeX);
        if (rangeX > 0 && rangeY > 0) { 
            for (let i = 1; i < step; i++) {
                line.push([line[0][0] + i, line[0][1] + i]);
            }
        } else if (rangeX > 0 && rangeY < 0) {
            for (let i = 1; i < step; i++) {
                line.push([line[0][0] + i, line[0][1] - i]);
            }
        } else if (rangeX < 0 && rangeY > 0) {
            for (let i = 1; i < step; i++) {
                line.push([line[0][0] - i, line[0][1] + i]);
            }
        } else if (rangeX < 0 && rangeY < 0) { 
            for (let i = 1; i < step; i++) {
                line.push([line[0][0] - i, line[0][1] - i]);
            }
        }
    }

    totalPoints.push(...line);
});

const counts = {};

for (const arr of totalPoints) {
  counts[arr] = counts[arr] ? counts[arr] + 1 : 1;
}

let counter = 0;
for (let val in counts) {
    if (counts[val] > 1) {
        counter++;
    }
}
console.log(counter);