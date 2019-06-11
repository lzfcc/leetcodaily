//Carryon 数数字 https://code.mi.com/problem/list/view?id=138
let readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// when a line is read
rl.on('line', (line) => {
    // process the input here
    [l, r] = line.split(/\s/) 
    l = parseInt(l)
    r = parseInt(r)   
})

// EOF
rl.on('close', () => {
    let s = 0
    for (let a = l; a < l + 15; a++) {
        s = (s + a) % 15
        arr.push(s)
    }
    console.log(arr[(r - l) % 15])
});

let l, r
let arr = []

