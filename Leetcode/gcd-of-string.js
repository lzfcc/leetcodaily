/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
	const len1 = str1.length
	const len2 = str2.length
	// make str1 longger than str2
	if (len1 < len2) {
		[str2, str1] = [str1, str2]
	}
	let p = 0
	let ans = ''
	while (p < str2.length) {
		if (str1[p] !== str2[p]) {
			return ''
		}
		p++
	}
	p = 1
	while (p <= str2.length) {
		if (Math.floor(str2.length / p) !== str2.length / p) {
			p++
			continue
		}
		const count1 = str1.length / p
		const count2 = str2.length / p
		ans = str2.slice(0, p)
		if (ans.repeat(count1) === str1 && ans.repeat(count2) === str2) {
			return ans
		}
		p++
	}
	return ''
};

gcdOfStrings('LEET', 'LEET')