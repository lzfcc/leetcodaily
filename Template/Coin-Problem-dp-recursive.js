// 算法竞赛入门经典 第九章

const V = [2, 3, 5, 7];
const S = 27;

const vis = new Array(S + 1).fill(0);
// d[i] 表示从节点 i 出发到状态 0 的最长/最短路径长度
// d[i] 值可以为 0，所以用 -1 表示“尚未计算”，用正负 Infinity 表示“无法到达”
const d = new Array(S + 1).fill(-1);

// 递归写法
function dpMax(S) {
	if (vis[S]) return d[S];
	vis[S] = 1;
	d[S] = -Infinity;
	for (let i = 0; i < V.length; i++) {
		if (S >= V[i]) {
			d[S] = Math.max(d[S], dpMax(S - V[i]) + 1);
		}
	}
	return d[S];
}

function dpMin(S) {
	if (vis[S]) return d[S];
	vis[S] = 1;
	d[S] = Infinity;
	for (let i = 0; i < V.length; i++) {
		if (S >= V[i]) {
			d[S] = Math.min(d[S], dpMin(S - V[i]) + 1);
		}
	}
	return d[S];
}

d[0] = 0;
vis[0] = 1;

dpMax(S);

console.log(d);

const coins = new Map(V.map(x => [x, 0]));
function print_ans(S) {
	for (let i = 0; i < V.length; i++) {
		if (S >= V[i] && d[S] == d[S - V[i]] + 1) {
			coins.set(V[i], coins.get(V[i]) + 1);
			print_ans(S - V[i]);
			break;
		}
	}
}

print_ans(S);
console.log(coins);