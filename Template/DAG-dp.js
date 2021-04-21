// 算法竞赛入门经典 第九章

const NUM = 7;
// 邻接矩阵
const G = new Array(NUM).fill(0).map(x => new Array(NUM).fill(0));
// 定义 DAG
G[0][1] = 1;
G[0][2] = 1;
G[1][3] = 1;
G[2][3] = 1;
G[3][4] = 1;
G[3][5] = 1;
G[2][6] = 1;

const d = new Array(NUM).fill(0).map(x => new Array(NUM).fill(0));
// 求解 DAG 中不固定起点的最长路径
// d[i] 表示从 i 出发的最长路长度
function dp(i) {
	if (d[i] > 0) return d[i];
	d[i] = 1;
	for (let j = 0; j < NUM; j++) {
		if (G[i][j]) {
			d[i] = Math.max(d[i], dp(j) + 1);
		}
	}
	return d[i];
}

dp(0);
const longest_path_len = d[0];
console.log("ans = ", d[0]);

const path = [];
function find_path(i) {
	path.push(i);
	for (let j = 0; j < NUM; j++) {
		if (G[i][j] && d[i] == d[j] + 1) {
			find_path(j);
		}
	}
	if (path.length == longest_path_len) {
		console.log(path.join('->'));
	}
	path.pop();
}

find_path(0);
