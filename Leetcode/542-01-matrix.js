const printMatrix = require('../Utility/PrintMatrix');

let steps = 1;

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
// 写了半天没写对，下面这个过了（也是看了答案以后改的），但是很慢。而且其实这个写的并不是 bfs，而是 dfs。
var updateMatrix = function(matrix) {
    const n = matrix.length, m = matrix[0].length;
    const ans = Array(matrix.length).fill(0).map(() => Array(matrix[0].length).fill(Infinity));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const bfs = (r, c) => {
        for (const dir of dirs) {
            const dr = r + dir[0];
            const dc = c + dir[1];
            if (dr >= 0 && dr < n && dc >= 0 && dc < m) {
                if (ans[dr][dc] > ans[r][c] + 1) {
                    ans[dr][dc] = ans[r][c] + 1;
                    bfs(dr, dc);
                }
            }
        }        
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 0) {
                ans[i][j] = 0; 
            }
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 0) {
                bfs(i, j);
            }
        }
    }
    return ans;
};
// 这个题要用 bfs 是对的，不过实现上要用队列。
var updateMatrixBFS = function(matrix) {
    const n = matrix.length, m = matrix[0].length;
    const ans = Array(matrix.length).fill(0).map(() => Array(matrix[0].length).fill(Infinity));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const q = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === 0) {
                ans[i][j] = 0;
                q.push([i, j]);
            }
        }
    }
    while (q.length) {
        const [r, c] = q.shift();
        console.log(`#${steps++}: (${r}, ${c})`);
        for (const dir of dirs) {
            const [dr, dc] = [r + dir[0], c + dir[1]];
            if (dr >=0 && dc >= 0 && dr <n && dc < m) {
                if (ans[dr][dc] > ans[r][c] + 1) {
                    ans[dr][dc] = ans[r][c] + 1;
                    printMatrix(ans);
                    q.push([dr, dc]);
                }
            }
        }
    }
    return ans;
};
// 关键步骤是，在 matrix[i][j] == 0 的位置直接设置 ans[i][j] = 0，然后从 matrix[i][j] == 1 的位置开始更新。

// 根据一些评论，dfs 其实也可以做的。
var updateMatrixDFS = function(matrix) {
    if (matrix.length == 0)
        return matrix;
    
    const n = matrix.length, m = matrix[0].length;
   
    const hasNeighborZero = (x, y) => 
        (x > 0 && matrix[x - 1][y] === 0 ||
        x < n - 1 && matrix[x + 1][y] === 0 ||
        y > 0 && matrix[x][y - 1] === 0 ||
        y < m - 1 && matrix[x][y + 1] === 0);

    const dfs = (x, y, val) => {
        console.log(`#${steps++}: (${x}, ${y}), val = ${val}`);
        // Base case. Boundary condition and new value who is larger than the previous found value, terminates.
        if (x < 0 || y < 0 || y >= m || x >= n || matrix[x][y] < val) {
            return;
        }
        // Set it as new value
        matrix[x][y] = val;
        
        printMatrix(matrix);

        dfs(x + 1, y, matrix[x][y] + 1);
        dfs(x - 1, y, matrix[x][y] + 1);
        dfs(x, y + 1, matrix[x][y] + 1);
        dfs(x, y - 1, matrix[x][y] + 1);
    }
    // Initialize, only "1" who neighbors "0" is determined. Kind of path trimming.
    // No need extra space
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++)
            if (matrix[i][j] === 1 && !hasNeighborZero(i, j))
                matrix[i][j] = Infinity;

    // Start from the determined "1"x
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++)
            matrix[i][j] === 1 && dfs(i, j, 1);

    return matrix;
}


// 另外本题还有 dp 做法。看起来很对，但是没有明确的证明。

let data = [
    [0,1,1,1,1],
    [1,1,0,1,1],
    [0,0,1,1,0],
    [1,1,1,1,1],
    [1,1,0,1,1]];

updateMatrixBFS(data);