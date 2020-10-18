/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    const ans = []
    const res = Array(n).fill(-1)
    helper(0, n, res, ans)
    return ans
};

function helper(row, n, res, ans) {
    if (row == n) {
        // console.log(res)
        ans.push(res.map(k => {
            const arr = Array(n).fill('.')
            arr[k] = 'Q'
            return arr.join('')
        }))
    }
    for (let i = 0; i < n; i++) {
        let ok = true
        for (let j = 0; j < row; j++) {
            if (res[j] == i || res[j] - j == i - row || res[j] + j == i + row) {
                ok = false
                break
            }
        }
        if (ok) {
            res[row] = i
            helper(row + 1, n, res, ans)
            res[row] = -1
        }
    }
}

solveNQueens(1)