var wordBreak = function(s, wordDict) {
	const dict = new Set(wordDict)
	let maxLen = 0
	for (const w of wordDict) {
		if (w.length > maxLen) {
			maxLen = w.length
		}
	}
	const badSuffix = new Set()
	const helper = (i) => {
		if (i >= s.length) {
			return true
		}
		let k = i + 1
		while (k <= Math.max(s.length, i + maxLen)) {
            const suffix = s.slice(k)
			if (dict.has(s.slice(i, k)) && !badSuffix.has(suffix)) {
                if (helper(k)) {
					return true
                } else {
                    badSuffix.add(suffix)
                }
			}
			k++
		}
		return false
	}
	return helper(0)
};

const a = wordBreak("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"])

console.log(a)