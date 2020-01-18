var maxScoreWords = function(words, letters, score) {
	const letterCount = {};
	for (const c of letters) {
		letterCount[c] = letterCount[c] || 0;
		letterCount[c]++;
	}
	const letterScore = {};
	for (let i = 0; i < score.length; i++) {
		const c = String.fromCharCode(97 + i);
        letterScore[c] = score[i];
	}
	const wordScore = {};
	for (const word of words) {
		wordScore[word] = 0;
		for (const c of word) {
			wordScore[word] += letterScore[c];
		}
	}
	let maxScore = 0;
	for (let n = 0; n < ((1 << words.length) - 1); n++) {
		let i = 0, m = n;
		let tempScore = 0;
		const counts = JSON.parse(JSON.stringify(letterCount));
		while(m) {
			if (m & 1) {
				if (testWord(words[i], counts)) {
					tempScore += wordScore[words[i]];
				} else {
					tempScore = -1;
					break;
				}
			}
			m >>= 1;
			i++;
		}
		maxScore = Math.max(maxScore, tempScore);
	}
	return maxScore;
};

function testWord(word, letterCount) {
	for (const c of word) {
		if (letterCount[c] > 0) {
			letterCount[c]--;
		} else {
			return 0;
		}
	}
	return 1;
}

var maxScoreWords = function(words, letters, score) {
	let letterCount = new Array(score.length).fill(0);
	let n = words.length;
	for (let c of letters) {
		letterCount[c.charCodeAt() - 97]++;
	}
	let dfs = i => {
		if (i == n) return 0;
		let res = Math.max(0, dfs(i + 1));  // 这是不使用 words[i] 时， wors[(i+1)...n] 的最大值
		let tmp = 0;
		let use = true;
		for (let c of words[i]) {
			const t = c.charCodeAt() - 97;
			letterCount[t]--;
			tmp += score[t];
			if (letterCount[t] < 0) {
				use = false;
			}
		}
		if (use) {
			res = Math.max(res, dfs(i + 1) + tmp); // 这是使用 words[i] 时， wors[(i+1)...n] 的最大值
		}
		for (let c of words[i]) { // 递归返回上层，清理这一层对数据的改变
			letterCount[c.charCodeAt() - 97]++;
		}
		return res;
	}
	return dfs(0);
};

var maxScoreWords = function(words, letters, score) {
	// process letters
	const letterScore = {}; 
	const letterCount = {};
	for(const c of letters) {
		letterScore[c] = score[c.charCodeAt(0) - 97]; 
		letterCount[c] = (letterCount[c] || 0) + 1;
	}
	// process words
	const validWords = [];
	for (const word of words) {
		let score = 0;
		let used = {};
		for (const c of word) {
			used[c] = (used[c] || 0) + 1; 
			if (!letterCount[c] || used[c] > letterCount[c]) {
				score = -1;
				break;
			}
			score += letterScore[c]; 
		}
		if (score > 0) {
			validWords.push({used, score});
		}; 
	}
	return (function findMax(prev, i, used) {
		if (i === validWords.length) {
			return prev;
		}
		const newUsed = { ...used };
		let fits = true;
		const word = validWords[i];
		const usedLetters = word.used;
		for (let [letter, count] of Object.entries(usedLetters)) {
			newUsed[letter] = (newUsed[letter] || 0) + count;
			if (newUsed[letter] > letterCount[letter]) {
				fits = false;
				break;
			}
		}
		return Math.max((fits ? findMax(prev + word.score, i + 1, newUsed) : prev),	findMax(prev, i + 1, used));
	})(0, 0, {});
};

maxScoreWords(["xxxz","ax","bx","cx"], ["z","a","b","c","x","x","x"], [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10])

maxScoreWords(
["daeagfh","acchggghfg","feggd","fhdch","dbgadcchfg","b","db","fgchfe","baaedddc"],
["a","a","a","a","a","a","a","b","b","b","b","b","b","b","b","b","c","c","c","c","c","c","c","c","c","c","c","d","d","d","d","d","d","d","d","d","d","d","d","d","d","e","e","e","e","e","e","e","e","e","e","f","f","f","f","f","f","f","f","f","f","f","f","f","f","g","g","g","g","g","g","g","g","g","g","g","g","h","h","h","h","h","h","h","h","h","h","h","h","h"],
[2,1,9,2,10,5,7,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);