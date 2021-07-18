// 算法竞赛入门经典 第九章
const V = [2, 3, 5, 7]; // 硬币面值
const S = 27; // 总额

const minv = new Array(S + 1).fill(Infinity);
minv[0] = 0;

const maxv = new Array(S + 1).fill(-Infinity);
maxv[0] = 0;

// 记录最优决策使用的硬币序号，用于打印结果
const min_coins = new Array(S + 1).fill(-1);
const max_coins = new Array(S + 1).fill(-1);

for (let i = 1; i <= S; i++) {
	for (let j = 0; j < V.length; j++) {
		if (i >= V[j]) {
//			minv[i] = Math.min(minv[i], minv[i - V[j]] + 1);
			if (minv[i] > minv[i - V[j]] + 1) {
				minv[i] = minv[i - V[j]] + 1;
				min_coins[i] = j;
			}
//			maxv[i] = Math.max(maxv[i], maxv[i - V[j]] + 1);
			if (maxv[i] < maxv[i - V[j]] + 1) {
				maxv[i] = maxv[i - V[j]] + 1;
				max_coins[i] = j;
			}
		}
	}
}

console.log(minv[S], maxv[S]);

function print_ans(arr, S) {
	while (S) {
		console.log(arr[S]);
		S -= V[arr[S]];
	}
}

print_ans(min_coins, S);

//function print_ans (d, S, V, ans) {
//	for (let i = 0; i < V.length; i++) {
//		if (S >= V[i] && d[S] == d[S - V[i]] + 1) {
//			ans[V[i]] = (ans[V[i]] || 0) + 1
//			print_ans(d, S - V[i], V, ans)
//			break
//		}
//	}
//}
//
//const ans = {}
//print_ans(minv, S, V, ans)
//console.log(ans)