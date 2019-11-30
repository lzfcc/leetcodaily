/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function(nums) {
    nums.sort((x, y) => y - x);
    const dp = nums.map(x => [0, 0, 0]);
    for (let i = 0; i < 3; i++) {
        dp[nums.length - 1][i] = nums[nums.length - 1] % 3 === i ? nums[nums.length - 1] : 0;
    }
    for (let j = nums.length - 2; j >= 0; j--) {
        if (nums[j] % 3 === 0) {
            dp[j][0] = dp[j + 1][0] === 0 ? 0 : dp[j + 1][0] + nums[j];
            dp[j][1] = dp[j + 1][1] === 0 ? 0 : dp[j + 1][1] + nums[j];
            dp[j][2] = dp[j + 1][2] === 0 ? 0 : dp[j + 1][2] + nums[j];
        } else if (nums[j] % 3 === 1) {
            dp[j][0] = dp[j + 1][2] === 0 ? dp[j + 1][0] : Math.max(dp[j + 1][0], dp[j + 1][2] + nums[j]);
            dp[j][1] = dp[j + 1][0] === 0 ? dp[j + 1][1] : Math.max(dp[j + 1][1], dp[j + 1][0] + nums[j]);
            dp[j][2] = dp[j + 1][1] === 0 ? dp[j + 1][2] : Math.max(dp[j + 1][2], dp[j + 1][1] + nums[j]);
        } else {
            dp[j][0] = dp[j + 1][1] === 0 ? dp[j + 1][0] : Math.max(dp[j + 1][0], dp[j + 1][1] + nums[j]);
            dp[j][1] = dp[j + 1][2] === 0 ? dp[j + 1][1] : Math.max(dp[j + 1][1], dp[j + 1][2] + nums[j]);
            dp[j][2] = dp[j + 1][0] === 0 ? dp[j + 1][2] : Math.max(dp[j + 1][2], dp[j + 1][0] + nums[j]);
        }
    }
    return dp[0][0];
};

let res = maxSumDivThree([2,6,2,2,7]);
 res = maxSumDivThree([5, 4, 3, 1, 1]);
 res = maxSumDivThree([3, 6, 5, 1, 8]);
console.log(res);