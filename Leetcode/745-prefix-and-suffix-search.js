function TrieNode () {
	this.children = null
	this.index = 0
}
/**
 * @param {string[]} words
 */
var WordFilter = function(words) {
	this.trie = new TrieNode()
	words.forEach((word, index) => {
		const composed = word + '#' + word
		for (let i = 0; i < word.length; i++) {
			let cur = this.trie
			for (const c of composed.slice(i)) {
				if (!cur.children) {
					cur.children = {}
				}
				if (!cur.children[c]) {
					cur.children[c] = new TrieNode()
				}
				cur = cur.children[c]
				cur.index = index
			}
		}
	})
};

/** 
 * @param {string} prefix 
 * @param {string} suffix
 * @return {number}
 */
WordFilter.prototype.f = function(prefix, suffix) {
	let cur = this.trie
	for (let c of (suffix + '#' + prefix)) {
		if (!cur.children || !cur.children[c]) {
			return -1
		}
		cur = cur.children[c]
	}
	// console.log(cur)
	return cur.index
};

const wf = new WordFilter(['apple', 'ape', 'apply', 'apologize', 'antivirus', 'analyze', 'appreciate', 'apparent', 'angle', 'annoy', 'analysis', 'anonymous'])
wf.f('ap', 'e')
wf.f('a', 'ze')
wf.f('a', 'e')
wf.f('an', 's')