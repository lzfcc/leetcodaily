
// 维基百科（https://zh.wikipedia.org/zh/%E4%BA%8C%E5%88%86%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95）
function BinarySearch1(A, T) {
	let L = 0, R = A.length - 1;
	BinarySearch2(A, L, R, T);
}

// 更加通用的版本，同样来自维基百科（C语言版本），传入左右两个 index 即可
function BinarySearch2(A, start, end, T) {
	let ret = -1;
	while (start <= end) {
		const m = (start + end) >> 1;
		if (A[m] < T) {
			start = m + 1;
		} else if (A[m] > T) {
			end = m - 1;
		} else {
			ret = m;
			break;
		}
	}
	return ret;
}

// 刘汝佳《算法竞赛入门经典》
function BinarySearch3(A, start, end, T) {
	let ret = -1;
	while (start < end) {
		const m = (start + end) >> 1;
		if (A[m] == T) {
			ret = m;
			break;
		} else if (A[m] > T) {
			end = m;
		} else {
			start = m + 1;
		}
	}
	return ret;
}

// 另外请参考：LowerBound.js

module.exports = BinarySearch1;