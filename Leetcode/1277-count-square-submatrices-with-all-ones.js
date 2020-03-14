var countSquares = function(matrix) {
	const maxD = Math.min(matrix.length, matrix[0].length);
	const sq = [];
	sq[1] = matrix.map(row => [...row]);
	let sum = matrix.reduce((sum, arr) => sum + arr.reduce((x, y) => x + y), 0);
	for (let d = 2; d <= maxD; d++) {
		sq[d] = matrix.map(row => [...row].map(() => 0));
		for (let i = 0; i < matrix.length; i++) {
			if (i + d > matrix.length) break;
			for (let j = 0; j < matrix[0].length; j++) {
				if (j + d > matrix[0].length) break;
				sq[d][i][j] = sq[d-1][i][j] & sq[d-1][i+1][j+1] & matrix[i+d-1][j] & matrix[i][j+d-1];
				// console.log(`(${i},${j}):${sq[d][i][j]}`);
				sum += sq[d][i][j];
			}
		 }
	}
	return sum;
};

/*
(i, j)
 +--------------------+---+
 |                    | 1 |
 |   +--------------------+ -
 |   |                |   | ^
 |   |                |   | |
 |   |                |   | |
 |   |                |   | |
 |   |                |   |d - 1
 |   |                |   | |
 |   |                |   | |
 +--------------------+   | |
 | 1 |                    | v
 +---+--------------------+ -
*/

// 节约空间，使用滚动数组
var countSquares = function(matrix) {
	const maxD = Math.min(matrix.length, matrix[0].length);
	const sq = [];
	sq[0] = matrix.map(row => [...row]);
	let sum = matrix.reduce((sum, arr) => sum + arr.reduce((x, y) => x + y), 0);
	for (let d = 1; d < maxD; d++) {
		sq[d%2] = matrix.map(row => [...row].map(() => 0));
		for (let i = 0; i < matrix.length; i++) {
			if (i + d == matrix.length) break;
			for (let j = 0; j < matrix[0].length; j++) {
				if (j + d == matrix[0].length) break;
                const pd = 1-d%2;
				sq[d%2][i][j] = sq[pd][i][j] & sq[pd][i+1][j+1] & matrix[i+d][j] & matrix[i][j+d];
				// console.log(`(${i},${j}):${sq[d][i][j]}`);
				sum += sq[d%2][i][j];
			}
		 }
	}
	return sum;
};

// better solution
// explanation: https://leetcode.com/problems/count-square-submatrices-with-all-ones/discuss/518072/Python-O(-m*n-)-sol-by-DP-93%2B-with-Hint-and-Demo
var countSquares = function(matrix) {
	let ans = 0;
	for(let i = 0; i < matrix.length; i++) {
		for(let j = 0; j < matrix[0].length; j++) {
			if (i && j && matrix[i][j])
				matrix[i][j] += Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
			ans += matrix[i][j];
		}
	}
	// console.log(matrix);
	return ans
};

const matrix = [
	[0,1,1,1],
	[1,1,1,1],
	[0,1,1,1]
];

countSquares(matrix);