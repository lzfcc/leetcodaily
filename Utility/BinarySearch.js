function BinarySearch(A, T) {
	let L = 0, R = A.length - 1;
	while (L <= R) {
		const m = (L + R) >> 1;
		if (A[m] < T) {
			L = m + 1;
		} else if (A[m] > T) {
			R = m - 1;
		} else {
			return m;
		}
	}
	return -1;
}

module.exports = BinarySearch;