// DAG 上的动态规划
// 换硬币
function change (S, V) {
	const minV = Array(S + 1).fill(Infinity)
	const maxV = Array(S + 1).fill(-Infinity)
	
	minV[0] = maxV[0] = 0
	
	for (let i = 0; i <= S; i++) {
		for (let j = 0; j < V.length; j++) {
			if (i >= V[j]) {
				minV[i] = Math.min(minV[i], minV[i - V[j]] + 1)
				maxV[i] = Math.max(maxV[i], maxV[i - V[j]] + 1)
			}
		}
	}
	
	console.log(minV[S], maxV[S])
	console.log('fewest coins:')
	const c1 = {}
	printAnswer(minV, S, V, c1)
	console.log(c1)
	console.log('most coins:')
	const c2 = {}
	printAnswer(maxV, S, V, c2)
	console.log(c2)
}

