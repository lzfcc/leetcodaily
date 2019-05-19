//小米兔洗澡澡 https://code.mi.com/problem/list/view?id=143&cid=10
// let k = 5;  //每个任务的时间
// let data = [[1, 1], [2, 1], [3, 1]];
// let time = [];
// let n = 2;  //最大并发数量
// let m = 0; //已使用资源数量

// let a = 4; //待求目标任务进入的时刻

// see: https://nodejs.org/api/readline.html

let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// when a line is read
rl.on('line', (line) => {
    // process the input here
    if (lineCount == 0) {
        [n, k] = line.split(/\s/).map(x=>x|0);
    } else if (lineCount == 1) {
    	let arr = line.split(/\s/).map(x=>x|0);
        for (let i = 1; i < arr.length; i+=2) {
            time[arr[i-1]] = arr[i];
        }
    } else if (lineCount == 2) {
        a = parseInt(line);
        solve(n, k, a, time);
    }
    lineCount++;
});

// EOF
rl.on('close', () => {
    
});

let lineCount = 0;
let n, k, a, time = [];

function solve(n, k, a, time) {
    console.log(arguments);
    let q = 0; //排队数量
    let m = 0; //当前正在使用人数
    let i = 1;
    for (; i < 1e7; i++) {
        if (i <= a) {
            q += (time[i] || 0);
        }
        if (i == a) {
            q++;  //小米兔自己
        }

        let outCount = 0;
        if (i - k >= 0) {
            outCount = (time[i - k] || 0);
        }
        m -= outCount;
        let inCount = n - m;
        if (inCount > q) {
            m += q;
            q = 0;
        } else {
            m = n;
            time[i] = inCount; //尽管i时刻实际上可能没有人来，但是此刻进入的人等效于此时刻新来的
            q -= inCount;
        }
        console.log(`时刻${i}: ${m}人使用中，${q}人排队中`);
        if (i > a && m == 0 && q == 0) break;
    }
    console.log(i);
}