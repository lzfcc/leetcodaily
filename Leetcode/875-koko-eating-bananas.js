var minEatingSpeed = function(piles, H) {
	let minSpeed = 1;
	let maxSpeed = Math.max(...piles);
	let medianTime, medianSpeed;
	while (minSpeed < maxSpeed) {
		medianSpeed = (minSpeed + maxSpeed) >> 1;
		medianTime = piles.reduce((sum, x, i) => sum + Math.ceil(piles[i] / medianSpeed), 0);
		if (medianTime < H) {
			maxSpeed = medianSpeed;
		} else if (medianTime > H) {
			minSpeed = medianSpeed + 1;
		} else {
			console.log(medianSpeed);
			return medianSpeed;
		}
	}
	const time = piles.reduce((sum, x, i) => sum + Math.ceil(piles[i] / minSpeed), 0); // 对于 ([4], 3) 这样的 case 会求出 minSpeed = maxSpeed = 1，这样显然不行，所以还要再验证一步
	if (time > H) minSpeed++;
	return minSpeed;
};

// 官方解答给出的答案
// 可以发现，这实际上就是二分求下界的写法
var minEatingSpeed = function(piles, H) {
	let minSpeed = 1;
	let maxSpeed = Math.max(...piles);
	const possible = K => piles.reduce((sum, a, i) => sum + Math.ceil(a / K), 0) <= H;
	let medianSpeed;
	while (minSpeed < maxSpeed) {
		medianSpeed = (minSpeed + maxSpeed) >> 1;
		if (possible(medianSpeed)) {
			maxSpeed = medianSpeed;
		} else {
			minSpeed = medianSpeed + 1;
		}
	}
	return minSpeed;
};

//minEatingSpeed([30,11,23,4,20],  5)
//minEatingSpeed([3,6,7,11], 8)
minEatingSpeed([1,2,1,1,1], 10);
minEatingSpeed([4], 3);