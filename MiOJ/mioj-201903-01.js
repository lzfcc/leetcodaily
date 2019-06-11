let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// when a line is read
rl.on('line', (line) => {
    let [a, b, c, d, e] = line.split(/\s/).map((x)=>(x|0));
    // process the input here
    (function(a, b, c, d, e) {
    let map = new Map();
    for (let i = -50; i <= 50; i++) {
        if (i == 0) continue;
        for (let j = -50; j <= 50; j++) {
            if (j == 0) continue;
            const res = d * (i ** 3) + e * (j ** 3);
            if (map[res]) {
                map[res]++; 
            } else {
                map[res] = 1;
            }
        }
    }

    let ans = 0;
    for (let i = -50; i <= 50; i++) {
        if (i == 0) continue;
        for (let j = -50; j <= 50; j++) {
            if(j == 0) continue;
            for (let k = -50; k<= 50; k++) {
                if (k == 0) continue;
                const res = a * (i ** 3) + b * (j ** 3) + c * (k ** 3);
                if (map[res]) {
                    ans += map[res];
                }
            }
        }
    }
    console.log(ans);
    return ans;
    })(a, b, c, d, e);
})