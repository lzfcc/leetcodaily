var maximumSlidingWindow = function (nums, k) {
    let res = [], q = [];
    for (let i = 0; i < nums.length; ++i) {
        if (q.length > 0 && q[0] == i - k) q.shift();
        while (q.length > 0 && nums[q[q.length - 1]] < nums[i]) q.pop();
        q.push(i);
        if (i >= k - 1) res.push(nums[q[0]]);
	}
    console.log(res + "\n--------");
    return res;
}

maximumSlidingWindow([-1, 3, -2, 2, 6, 0, 4, 8, 1], 3);
maximumSlidingWindow([-1, 3, -2, 2, 6, 0, 4, 8, 1], 4);
maximumSlidingWindow([2, 3, 8, 6, 0, 4, 1, 0, 5], 3);
maximumSlidingWindow([5, 3, 2, 7, 6, 3, -4, 8], 2);
maximumSlidingWindow([1,3,1,2,0,5], 3);