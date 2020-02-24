// 最朴素的模拟手算。这个实际上是贪心法？正确性见 Cyclic Permutation
var minSwapsCouples = function(row) {
    const indexes = {};
    for (let i = 0; i < row.length; i++) {
        indexes[row[i]] = i;
    }
    let swp = 0;
    for (let i = 0; i < row.length; i += 2) {
        let a = row[i];
        let b = a % 2 === 0 ? a + 1 : a - 1;
        if (row[i + 1] === b) continue;
        let g = indexes[b];
        indexes[b] = i + 1;
        indexes[row[i + 1]] = g;
        [row[i + 1], row[g]] = [row[g], row[i + 1]];
        swp++;
    }  
    return swp;
};

var minSwapsCouples = function(row) {
    const n = row.length / 2;
    const dsu = new DSU(n);
    let swp = n;
    for (let i = 0; i < row.length; i += 2) {
        const a = row[i] >> 1;
        const b = row[i + 1] >> 1;
        if (dsu.union(a, b)) {
            swp--;
        }
    }
    return n - swp;
};

class DSU {
    constructor(N) {
        this.par = [...Array(N).keys()];
    }
    find(x) {
        if (x != this.par[x]) {
            this.par[x] = this.find(this.par[x]);
        }
        return this.par[x];
    }
    union(x, y) {
        const px = this.find(x),
              py = this.find(y);
        if (px == py) return false;
        this.par[px] = this.par[py];
        return true;
    }
}

minSwapsCouples([4,3,8,1,6,9,2,0,7,5]);