var longestConsecutive = function(nums) {
    if (nums.length < 2) return nums;
    const numSet = new Set(nums);
    let longest = 0, len = 1;
    nums.sort((x, y) => x - y);
    for (const n of nums) {
        let x = n;
        while (numSet.has(x + 1)) {
            numSet.delete(x);
            x++;
            len++;
        }
        longest = Math.max(longest, len);
        len = 1;
    }
    return longest;
};

longestConsecutive([100, 4, 200, 1, 3, 2]);
longestConsecutive([10, 32, 7, 8, 12, 6, 9, 33, 8])