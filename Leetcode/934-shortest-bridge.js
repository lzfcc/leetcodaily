//非常赞的一道题！官方给出的做法结合了 DFS（求连通区） 和 BFS（求最短路）

/**
 * @param {number[][]} A
 * @return {number}
 */
// 我自己的写法：标记连通区，找到边界，求边界上的点的最短距离（我用 BFS 求的连通区）
var shortestBridge = function(A) {
    const dirs = [[1,0],[0,1],[-1,0],[0,-1]];
    const q = [];
    // find a conneting component
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] === 1) {
                q.push([i, j]);
                break;
            }
        }
        if (q.length > 0) break;
    }
    let k = 0;
    while (q.length > 0) {
        let [i, j] = q.shift();
        A[i][j] = 2;
        for (const d of dirs) {
            if (i + d[0] >= 0 && i + d[0] < A.length && j + d[1] >= 0 && j +d[1] < A[0].length && A[i + d[0]][j + d[1]] === 1) {
                q.push([i + d[0], j + d[1]]);
            }
        }
        k++;
        console.log(q.length, k);
        if (k > 100000) break;
    }
    const boundary1 = [], boundary2 = [];
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] === 0) continue;
            let isBoundary = false;
            for (const d of dirs) {
                if (i + d[0] >= 0 && i + d[0] < A.length && j + d[1] >= 0 && j +d[1] < A[0].length && A[i + d[0]][j + d[1]] === 0) {
                    isBoundary = true;
                    break;
                }
            }
            if (isBoundary) {
                if (A[i][j] === 1) {
                    boundary1.push([i, j]);
                } else {
                    boundary2.push([i, j]);
                }
            }
        }
    }
    let ans = Infinity;
    for (const b1 of boundary1) {
        for (const b2 of boundary2) {
            ans = Math.min(ans, Math.abs(b1[0] - b2[0]) + Math.abs(b1[1] - b2[1]));
        }
    }
    return ans - 1;
};

var shortestBridge = function(A) {
    const dirs = [[1,0],[0,1],[-1,0],[0,-1]];
    const validate = (row, col) => row >= 0 && col >= 0 && row < A.length && col < A[0].length;
    const q = [];

    const dfs = (i, j) => {
        A[i][j] = 2;
        q.push([i, j, 0]);
        for (const d of dirs) {
            const ni = i + d[0], nj = j + d[1];
            if (validate(ni, nj) && A[ni][nj] === 1) {
                dfs(ni, nj);
            }
        }
    }
    // find a conneting component
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (A[i][j] === 1) {
                dfs(i, j);
                break;
            }
        }
        if (q.length > 0) break;
    }

    (function print() {
        for (const row of A) {
            console.log(row.join(''));
        }
    })()

    let ans = 0;
    while (q.length > 0) {
        let [i, j, depth] = q.shift();
        for (const d of dirs) {
            const ni = i + d[0], nj = j + d[1];
            if (!validate(ni, nj) || A[ni][nj] === 2) continue;
            if (A[ni][nj] === 1) return depth; // reaches the second island
            A[ni][nj] = 2;
            q.push([ni, nj, depth + 1]);
        }
    }
    return ans;
};

let A = [
    [1,1,1,0,0],
    [1,1,0,0,0],
    [1,1,0,0,1],
    [1,0,0,0,1],
    [0,0,1,1,1]
];
A = [
[1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
[1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
[0,0,1,0,1,1,1,1,0,1,1,1,1,0,0,0,0],
[0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0],
[1,1,0,0,1,1,0,1,1,1,1,1,1,0,0,0,0],
[1,1,1,0,0,1,0,1,1,1,1,1,0,0,0,0,0],
[1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
[1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0]
]
shortestBridge(A);