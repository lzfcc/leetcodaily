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
	return R;  //返回下界
}

var findRadius = function(houses, heaters) {
	heaters.sort((x, y) => x - y);
	let maxDis = 0;
	for (const h of houses) {
		const leftHeaterIndex = BinarySearch(heaters, h);
		let minDis;
		if (leftHeaterIndex < 0) {
			minDis = heaters[0] - h;
		} else if (leftHeaterIndex === heaters.length - 1) {
			minDis = h - heaters[leftHeaterIndex]
		} else {
			minDis = Math.min(h - heaters[leftHeaterIndex], heaters[leftHeaterIndex + 1] - h);
		}
		maxDis = Math.max(maxDis, minDis);
	}
	return maxDis;
};