var subsetsWithDup = function(nums) {
    const n = nums.length;
    const dict = {};
    for (const num of nums) {
        if (!dict[num]) dict[num] = 0;
        dict[num]++;
    }
    let output = [[]]
    for (const [num, count] of Object.entries(dict)) {
        const tmp = [];
        for (const cur of output) {
            let rep = [...cur];
            for (let i = 0; i < count; i++) {
                rep = [...rep, num];
                tmp.push(rep);
            }
        }
        output = [...output, ...tmp];
    }
    return output;
};

var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const ret = [];
    (function backtrace(subSet, start) {
        ret.push([...subSet]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            } else {
                subSet.push(nums[i]);
                backtrace(subSet, i + 1);
                subSet.pop();
            }
        }
    })([], 0)
    return ret;
};

subsetsWithDup([1,2,2,3]);