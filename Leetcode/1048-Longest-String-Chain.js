var longestStrChain = function(words) {
	const n = words.length;
	const wordsMap = new Map(words.map((w, i) => [w, i]));
	const G = new Array(n).fill(0).map(() => ({}));
	words.forEach((w, idx) => {
		for (let i = 0; i < w.length; i++) {
			const s = w.substring(0, i) + w.substring(i + 1);
			if (wordsMap.has(s)) {
				G[wordsMap.get(s)][idx] = 1;
			}
		}
	});
	const d = new Array(n).fill(0);
	// dp(i) 表示从节点 i 出发的最长路径长度
	function dp(i) {
		if (d[i] > 0) return d[i];
		d[i] = 1;
		for (let j = 0; j < n; j++) {
			if (G[i][j]) 
				d[i] = Math.max(d[i], dp(j) + 1);
		}
		return d[i];
	};
	let maxd = 0;
	for (let i = 0; i < n; i++) {
		maxd = Math.max(maxd, dp(i));
	}
	return maxd;
};

var longestStrChain = function(words) {
	let map = {};
	let res = 0;
	words.sort((a, b) => a.length - b.length);
	for (const word of words){
		let len = 1;
		for (let i = 0; i < word.length; i++){
			const prev = word.slice(0, i) + word.slice(i + 1);
			if (map[prev]){
				len = (map[prev] | 0) + 1;
				break;
			} 
		}
		map[word] = len;
		if (len > res) res = len;
	}
	return res;
}

//longestStrChain(["a","b","ba","bca","bda","bdca"]);
longestStrChain(["ksqvsyq","ks","kss","czvh","zczpzvdhx","zczpzvh","zczpzvhx","zcpzvh","zczvh","gr","grukmj","ksqvsq","gruj","kssq","ksqsq","grukkmj","grukj","zczpzfvdhx","gru"]);


