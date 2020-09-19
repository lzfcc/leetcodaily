class DAG {
	constructor (v = 0) {
		this.v = v
		this.adj = Array(v).fill(0).map(_ => [])
		this.inDegree = Array(v).fill(0)
	}
	addEdge (f, t) {
		if (!this.adj[f]) {
			this.adj[f] = []
		}
		this.adj[f].push(t)
		this.inDegree[t] = (this.inDegree[t] || 0) + 1
	}
	topologicalSort () {
		const ans = []
		const q = []
		for (let i = 0; i < this.inDegree.length; i++) {
			if (this.inDegree[i] === 0) {
				q.push(i)
			}
		}
		while (q.length > 0) {
			const v = q.shift()
			ans.push(v)
			for (const w of this.adj[v]) {
				this.inDegree[w]--
				if (this.inDegree[w] === 0) {
					q.push(w)
				}
			}
		}
		// console.log(ans)
		return ans.length === this.v
	}
}

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
	const g = new DAG(numCourses)
	for (const [t, f] of prerequisites) {
		g.addEdge(f, t)
	}
	return g.topologicalSort()
};