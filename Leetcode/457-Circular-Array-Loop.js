var circularArrayLoop = function(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        let forward = nums[i] > 0 ? 1 : 0;
        let fast = i, slow = i;
        while (true) {
            const ts = slow + nums[slow];
            if (ts >= n) {
                slow = ts % n;
            } else if (ts < 0) {
                slow = ts % n + n;
            } else {
                slow = ts;
            }
            if (forward ^ (nums[slow] > 0 ? 1 : 0) === 1) break; // 反向
            const tf = slow + nums[slow];
            if (tf >= n) {
                fast = tf % n;
            } else if (tf < 0) {
                fast = tf % n + n;
            } else {
                fast = tf;
            }
            if (forward ^ (nums[fast] > 0 ? 1 : 0) === 1) break; // 反向
            if (slow === fast) {
                return true;
            }
        }
    }
    return false;
};

// circularArrayLoop([2,-1,1,2,2]);
circularArrayLoop([-1, 2]);
// circularArrayLoop([-2, 1, 5, -2, 4, -1, 1, 3]);