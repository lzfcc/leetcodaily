// 这个题可以用 Subset II (含重复元素的集合的子集)来做。额外加了一步，对每个子集求全排列。 
var numTilePossibilities = function(tiles) {
    tiles = tiles.split('').sort();
    
    const frac = n => {
        let x = 1;
        while (n) {
            x *= n;
            n--;
        }
        return x;
    }
    const permutation = arr => {
        if (arr.length === 0) return 0;
        const dic = {};
        for (let i = 0; i < arr.length; i++) {
            const c = arr[i];
            dic[c] ? dic[c]++ : dic[c] = 1;
        }
        const values = Object.values(dic);
        const sum = frac(arr.length);
        return values.reduce((x, y) => x / frac(y), sum); // n! / (x1!*x2!*...xk!)
    }
    
    let total = 0;
    (function backtrace(subSet, start) {
        total += permutation(subSet); // is a possible combination;
        for (let i = start; i < tiles.length; i++) {
            if (i > start && tiles[i] === tiles[i - 1]) {
                continue;
            } else {
                subSet.push(tiles[i]);
                backtrace(subSet, i + 1);
                subSet.pop();
            }
        }
    })([], 0);
    return total;
};