var maxUncrossedLines = function(nums1, nums2) {
	const dp = Array.from({ length: nums1.length + 1 }, () => Array(nums2.length + 1).fill(0))
	const parent = Array.from({ length: nums1.length + 1 }, () => Array(nums2.length + 1).fill(0))
	for (let i = 0; i < nums1.length; i++) {
		parent[i][0] = 1 // up
	}
	for (let i = 0; i < nums2.length; i++) {
		parent[0][i] = 2 // left
	}
	for (let i = 1; i <= nums1.length; i++) {
		for (let j = 1; j <= nums2.length; j++) {
			if (nums1[i - 1] === nums2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1
				parent[i][j] = 0
			}
			else {
				dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1]
				parent[i][j] = dp[i - 1][j] > dp[i][j - 1] ? 1 : 2
			}
		}
	}
	const common = []
	let t = nums1.length, s = nums2.length
	while (t || s) {
		if (parent[t][s] === 0) {
			common.push(nums1[t - 1])
			t--
			s--
		}
		else if (parent[t][s] === 1) {
			t--
		}
		else {
			s--
		}
	}
	console.log(common.reverse())
	return dp[nums1.length][nums2.length]
};

maxUncrossedLines([2,5,1,2,5], [10,5,2,1,5,2])