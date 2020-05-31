var subarraySum = function(nums, k) {
    const sumFreq = new Map([[0, 1]]);
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        i > 0 && (nums[i] += nums[i - 1]);
        const x = nums[i] - k;
        if (sumFreq.has(x)) {
            ans += sumFreq.get(x);
        }
        sumFreq.set(nums[i], 1 + (sumFreq.get(nums[i]) || 0));
    }
    return ans;
};

let nums = [1, 1, 1];
subarraySum(nums, 2);
// nums = [];
// for (let i = 0; i < 100; i++) {
//     nums.push(-100 + Math.round(Math.random() * 200));
// }
nums = [-17, 39, 84, -100, -19, 11, -23, 57, -4, -75, -34, -23, 56, -52, 62, -44, 90, -88, 24, 95, 19, 16, -82, -30, 21, -77, -93, -80, 94, 9, -23, -83, 20, 72, -47, 14, 71, -56, 6, 60, -65, -89, 16, -36, 87, -38, 51, -30, 68, 43, -92, -29, -84, -44, -52, 53, 38, 48, 60, 23, 0, 88, -33, 23, 96, -81, -65, 45, -25, 96, -97, 99, 3, 22, 48, -16, -83, 73, 70, 85, 27, -64, 28, 30, 62, -56, 47, -25, 55, 17, -31, 86, 96, 8, -42, -86, 67, -32, 41, -44];
subarraySum(nums, 26);

//刚开始这样写
var subarraySum = function(nums, k) {
    const sumFreq = new Map([[0, 1],[num[0], 1]]);
    let ans = 0;
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1];
        const x = nums[i] - k;
        if (sumFreq.has(x)) {
            ans += sumFreq.get(x);
        }
        sumFreq.set(nums[i], 1 + (sumFreq.get(nums[i]) || 0));
    }
    return ans;
};
//这样就忽略了只有一个元素的情况
nums = [1]
subarraySum(nums, 1); // -> 0 Wrong Answer!

// 其实数组的和用一个单独的变量存储就可以，不需要覆盖原数组