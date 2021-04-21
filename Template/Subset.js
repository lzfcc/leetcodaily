// n 个不重复元素的子集有 2^n 个，所以可以用位向量方法做。但这里展示了另一种递归方法。

exports.subsets = function(nums) {
    const n = nums.length;
    let output = [[]]
    for (const num of nums) {
        const tmp = output.map(cur => [...cur, num]);
        output = [...output, ...tmp];
    }
    return output;
};

// 比如求 {1, 2, 3} 的子集。子集产生步骤为
// 1. {{}}
// 2. {{}, {1}}
// 3. {{}, {1}, {2}, {1, 2}}
// 4. {{}, {1}, {2}, {1, 2}, {3}, {1, 3}, {2, 3}, {1, 2, 3}}

// 对于包含重复元素的子集，也可以用上面的方法做，但是比较麻烦。这里展示回溯法。
// 包含重复元素的子集求解的难点是如何做到 1.不重 2.不漏

exports.subsetsWithDupulication = function(nums) {
    nums.sort((a, b) => a - b);
    const ret = [];
    (function backtrace(subSet, start) {
        ret.push([...subSet]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) {  // 这句是重点！保证了不重不漏。去掉这句话，就可以作为不含重复元素的集合求子集的代码使用。
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