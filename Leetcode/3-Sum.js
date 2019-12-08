var threeSum = function(nums) {
	nums.sort((x, y) => x - y);
	const res = new Set();
	for (let i = 0; i < nums.length - 1; i++) {
		const x = - nums[i];
		let p = i + 1, q = nums.length - 1;
		while (p < q) {
			if (nums[p] + nums[q] < x) {
				p++;
			} else if (nums[p] + nums[q] > x) {
				q--;
			} else {
				const arr = [nums[i], nums[p], nums[q]];
				res.add(JSON.stringify(arr));
				p++;
				q--;
			}
		}
	}
	return Array.from(res).map(x => JSON.parse(x));
};

// 参考快速解答
var threeSum = function(nums) {
	let result = [];
	if (nums.length < 3) {
		return result;
	}
	nums.sort((a, b) => a - b);
	
	for (let i = 0; i < nums.length - 2; i++) {
		if (nums[i] > 0) {
			break;
		}
		if (i > 0 && nums[i] == nums[i - 1]) {
			continue;
		}
		
		let sum = -nums[i];
		let lo = i + 1;
		let hi = nums.length - 1;
		
		while (lo < hi) {
			if (nums[lo] + nums[hi] == sum) {
					result.push([nums[i], nums[lo], nums[hi]]);
					while (nums[lo] == nums[lo + 1]) {
						lo++;
					} //因为 i, lo 都已经去过重复了，所以 hi 不需要了
					lo++;
					hi--;
			} else if (nums[lo] + nums[hi] < sum) {
				lo++;
			} else {
				hi--;
			}
		}
	}
	return result;
};

const res = threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6,6,6,6,6]);
console.log(res);