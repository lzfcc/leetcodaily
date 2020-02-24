/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

var solve = function(board) {
    const H = board.length;
    if (H === 0) return board;
    const W = board[0].length;
    if (W === 0) return board;
    const vis = Array(H).fill(0).map(x => Array(W).fill(0));
    const open = Array(H).fill(0).map(x => Array(W).fill(0));
    
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const search = function(y, x) {
        vis[y][x] = 1;
        open[y][x] = 1;
        for (const dir of dirs) {
            const nx = x + dir[0];
            const ny = y + dir[1];
            if (nx >= 0 && nx < W && ny >= 0 && ny < H && board[ny][nx] === 'O' && !vis[ny][nx]) {
                search(ny, nx);
            }
        }
    }
    
    for (let i = 0; i < W; i++) {
        if (board[0][i] === 'O') {
            search(0, i);
        }
        if (board[H - 1][i] === 'O') {
            search(H - 1, i);
        }
    }
    for (let i = 0; i < H; i++) {
        if (board[i][0] === 'O') {
            search(i, 0);
        }
        if (board[i][W - 1] === 'O') {
            search(i, W - 1);
        }
    }
    
    // console.log(open);

    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (board[i][j] === 'O' && !open[i][j]) {
                board[i][j] = 'X';
            }
        }
    }
};

solve([
    ["X","O","X","O","X","O"],
    ["O","X","O","X","O","X"],
    ["X","O","X","O","X","O"],
    ["O","X","O","X","O","X"]]);