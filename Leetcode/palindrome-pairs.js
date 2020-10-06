function palindromePairs(words) {
	const pairs = []
	if (!words) {
		return pairs
	}
	const map = new Map()
	for (let i = 0; i < words.length; ++i) {
		map.set(words[i], i)
	}
	words.forEach((word, i) => {
		let l = 0, r = 0
		let s, j, mid
		while (l <= r) {
			s = reverse(word.slice(l, r))
			j = map.get(s)
			mid = l === 0 ? word.slice(r) : word.slice(0, l)
			if (j !== undefined && i !== j && isPalindrome(mid)) {
				pairs.push(l === 0 ? [i, j] : [j, i])
			}
			if (r < word.length) {
				++r
			} else {
				++l
			}
		}
	})
	return pairs
}

function isPalindrome(s) {
	for (let i = 0; i < (s.length >> 1); ++i) {
		if (s[i] !== s[s.length - 1 - i]) {
			return false
		}
	}
	return true
}

function reverse(s) {
	return s.split('').reverse().join('')
}

palindromePairs(["abcd","dcba","lls","s","sssll",""])
 
