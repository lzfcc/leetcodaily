// Tag: Graph - Tarjan

function US (n) {
	this.parents = [...Array(n).keys()]
    this.count = n
}
US.prototype.union = function (x, y) {
	const p1 = this.find(x)
	const p2 = this.find(y)
	if (p1 != p2) {
		this.parents[p1] = p2
		this.count--
	}
} 
US.prototype.find = function (x) {
	if (x != this.parents[x]) {
	    this.parents[x] = this.find(this.parents[x])
	}
    return this.parents[x]
}

function countComponent (n, edges) {
	const us = new US(n)
	for (const e of edges) {
		us.union(e[0], e[1])
	}
	return us.count
}

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
		if (countComponent(n, connections2) > 1) {
 */
var criticalConnections = function(n, connections) {
    const ans = []
	let connections2 = []
    for (let i = 0; i < connections.length; i++) {
		connections2 = connections.slice()
		connections2.splice(i, 1)
		if (countComponent(n, connections2) > 1) {
			ans.push(connections[i])
		}
	}
	return ans
};

// Tarjan Algorithm
// https://zhuanlan.zhihu.com/p/101923309
// https://byvoid.com/zhs/blog/scc-tarjan/
class Graph {
	constructor (N) {
//		N += 10
		this.N = N
		this.head = Array(N).fill(0)
		this.ver = Array(2 * N).fill(0)
		this.next = Array(2 * N).fill(0)
		this.dfn = Array(N).fill(0)
		this.low = Array(N).fill(0)
		this.bridge = Array(2 * N).fill(0)
		this.tot = 1
		this.num = 0;
	}
	add (x, y) {
		this.ver[++this.tot] = y
		this.next[this.tot] = this.head[x]
		this.head[x] = this.tot
	}
	tarjan (x, inEdge) {
		this.dfn[x] = this.low[x] = ++this.num
		for (let i = this.head[x]; i; i = this.next[i]) {
			const y = this.ver[i]
			if (!this.dfn[y]) {
				this.tarjan(y, i)
				this.low[x] = Math.min(this.low[x], this.low[y])
				if (this.low[y] > this.dfn[x]) {
					this.bridge[i] = this.bridge[i ^ 1] = 1
				}
			} else if (i != (inEdge ^ 1)) {
				this.low[x] = Math.min(this.low[x], this.dfn[y])
			}
		}
	}
	solveBidge () {
		for (let i = 1; i <= this.N; i++) {
			if (!this.dfn[i]) {
				this.tarjan(i, 0)
			}
	 	}
		const ans = []
		for (let i = 2; i < this.tot; i += 2) {
			if (this.bridge[i]) {
				ans.push([this.ver[i ^ 1], this.ver[i]])
			}
		}
		console.log(ans)
		return ans
	}
}

var criticalConnections = function(n, connections) {
	const g = new Graph(n)
    for (let i = 0; i < connections.length; i++) {
		const [x, y] = connections[i]
		g.add(x, y)
		g.add(y, x)
	}
	return g.solveBidge()
};


// non-tarjan
// https://leetcode.com/problems/critical-connections-in-a-network/discuss/382638/No-TarjanDFS-detailed-explanation-O
var criticalConnections = function(n, connections) {
	const graph = Array(n)
	const ranks = Array(n).fill(-Infinity)
	for (let i = 0; i < n; i++) {
		graph[i] = []
	}

	for (let i = 0; i < connections.length; i++) {
		const [x, y] = connections[i]
		graph[x].push(y)
		graph[y].push(x)
	}
	
	const ans = []
	const dfs = (node, rank) => {
		if (ranks[node] >= 0) {
			return ranks[node]
		}

		ranks[node] = rank
		let minRank = rank
		for (const neighbor of graph[node]) {
			if (ranks[neighbor] == rank - 1 // Do not go back to parent, this will lead to parent-child-parent circle immediately.
				|| ranks[neighbor] > rank) { // ?
					continue
			}

			const neighborRank = dfs(neighbor, rank + 1)
			minRank = Math.min(minRank, neighborRank)
			if (neighborRank > rank) {
				ans.push([node, neighbor])
			}
		}
		return minRank
	}
	dfs(0, 0);        
	return ans
};

criticalConnections(5, [[0,1],[1,2],[2,0],[1,3],[3,4]])
